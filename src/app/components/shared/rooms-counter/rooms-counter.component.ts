import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ConstantService } from '../../../services/constant.service';
import { RoomsCounter } from '../../../models/rooms-counter.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-rooms-counter',
  templateUrl: './rooms-counter.component.html',
  styleUrls: ['./rooms-counter.component.sass'],
})
export class RoomsCounterComponent implements OnInit {
  @Input() roomModel: RoomsCounter[];
  @Input() theme: string;
  @Output() selection = new EventEmitter<RoomsCounter[]>();

  form: FormGroup;
  roomsArray: FormArray;
  wasInside: boolean;
  show: boolean = true;
  errorMessage = '';
  ageList = [];
  numberOfPassengers = 1;
  numberOfRooms = 1;
  rooms: RoomsCounter[] = [];

  @HostListener('click')
  clickInside() {
    console.log('INI clickInside');

    this.wasInside = true;

    console.log('this.wasInside: ' + this.wasInside);
    console.log('this.show: ' + this.show);
    console.log('this.errorMessage: ' + this.errorMessage);

    if (this.show === false) {
      $('#panelHabitaciones').hide();
    }
    if (this.show === true) {
      $('#panelHabitaciones').show();
    }

    console.log('FIN clickInside');
  }

  @HostListener('document:click')
  clickout() {
    console.log('INI clickout');

    if (!this.wasInside) {
      this.show = false;
      this.errorMessage = '';
    }
    this.wasInside = false;
    //$("#panelHabitaciones").hide();

    console.log('this.wasInside: ' + this.wasInside);
    console.log('this.show: ' + this.show);
    console.log('this.errorMessage: ' + this.errorMessage);

    if (this.show === false) {
      $('#panelHabitaciones').hide();
    }
    if (this.show === true) {
      $('#panelHabitaciones').show();
    }

    console.log('FIN clickout');
  }

  constructor(
    private fb: FormBuilder,
    private constantService: ConstantService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    $('#panelHabitaciones').hide();
    this.ageList = this.constantService.getChildrenAge();
    this.form = this.fb.group({
      rooms: new FormArray([]),
    });
    this.roomsArray = this.form.controls.rooms as FormArray;

    if (this.roomModel && this.roomModel.length > 0) {
      this.roomModel.forEach((room) => {
        this.roomsArray.push(
          new FormGroup({
            adults: new FormControl(room.adults),
            children: new FormControl(room.children),
            ages: new FormArray([]),
          })
        );
        const r = this.getRoom(this.roomsArray.length - 1);
        room.ages.forEach((age) => {
          (r.controls.ages as FormArray).push(
            new FormGroup({
              age: new FormControl(age),
            })
          );
        });
      });
      this.updatePreview();
    } else {
      this.addRoom();
    }
  }

  addRoom() {
    if (this.numberOfRooms < 9) {
      this.roomsArray.push(
        new FormGroup({
          adults: new FormControl(2),
          children: new FormControl(0),
          ages: new FormArray([]),
        })
      );
      this.updatePreview();
    } else {
      this.errorMessage = 'Limite de habitaciones: 9';
    }
  }

  removeRoom() {
    if (this.numberOfRooms > 1) {
      this.roomsArray.removeAt(this.roomsArray.length - 1);
      this.updatePreview();
    }
  }

  updatePreview() {
    this.numberOfRooms = this.roomsArray.length;
    let passengers = 0;
    // const rooms: RoomsCounter[] = [];
    let ageList: number[] = [];
    this.rooms = [];
    this.roomsArray.value.forEach((room) => {
      ageList = [];
      room.ages.forEach((val) => {
        ageList.push(parseInt(val.age, 10));
      });
      this.rooms.push({
        adults: room.adults,
        children: room.children,
        ages: ageList,
        passengers: [],
      });
      passengers += Number(room.adults) + Number(room.children);
    });
    this.numberOfPassengers = passengers;
    this.errorMessage = '';
    // this.roomModel = rooms;
    this.selection.emit(this.rooms);
    // console.log(this.roomModel);
  }

  updateAgeModel(roomIndex: number, ageIndex) {
    this.rooms[roomIndex].ages[ageIndex] = parseInt(
      ((this.getRoom(roomIndex).controls.ages as FormArray).controls[
        ageIndex
      ] as FormGroup).controls.age.value,
      10
    );
  }

  getRoom(index: number) {
    return this.roomsArray.controls[index] as FormGroup;
  }

  addAdult(roomIndex: number) {
    if (this.numberOfPassengers < 9) {
      this.getRoom(roomIndex).controls.adults.setValue(
        Number(this.getRoom(roomIndex).controls.adults.value) + 1
      );
      this.updatePreview();
    } else {
      this.errorMessage = 'Límite de pasajeros: 9';
    }
  }

  removeAdult(roomIndex: number) {
    const room = this.getRoom(roomIndex);
    if (room.controls.adults.value > 1) {
      if (this.validAdults(this.getRoom(roomIndex))) {
        room.controls.adults.setValue(Number(room.controls.adults.value) - 1);
        this.updatePreview();
      } else {
        this.errorMessage = 'Límite de menores por adulto: 4';
      }
    }
  }

  addChild(roomIndex: number) {
    if (this.numberOfPassengers < 9) {
      if (this.validChildrenPerAdult(this.getRoom(roomIndex))) {
        this.getRoom(roomIndex).controls.children.setValue(
          Number(this.getRoom(roomIndex).controls.children.value) + 1
        );

        (this.getRoom(roomIndex).controls.ages as FormArray).push(
          new FormGroup({
            age: new FormControl('0'),
          })
        );

        this.updatePreview();
      } else {
        this.errorMessage = 'Límite de menores por adulto: 4';
      }
    } else {
      this.errorMessage = 'Límite de pasajeros: 9';
    }
  }

  removeChild(roomIndex: number) {
    const room = this.getRoom(roomIndex);
    if (room.controls.children.value > 0) {
      room.controls.children.setValue(Number(room.controls.children.value) - 1);

      (this.getRoom(roomIndex).controls.ages as FormArray).removeAt(
        (this.getRoom(roomIndex).controls.ages as FormArray).length - 1
      );

      this.updatePreview();
    }
  }

  validAdults(room: FormGroup) {
    const adults = room.controls.adults.value;
    const children = room.controls.children.value;
    return children / 4 <= adults - 1;
  }

  validChildrenPerAdult(room: FormGroup) {
    const adults = room.controls.adults.value;
    const children = room.controls.children.value;
    return (children + 1) / 4 <= adults;
  }

  close() {
    /*  console.log(this.form); */
  }
}
