import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';

import { TransportationBusiness } from '@app/transportation/business/transportation.business';
import { Transportation } from '@app/transportation/business/transportation.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();
  transportationList?: Transportation[];
  $searchKeyInput = new Subject<string>();
  searchValue = '';

  constructor(
    private transportation: TransportationBusiness,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.transportation.listAll()
      .pipe(takeUntil(this.$destroy))
      .subscribe(list => this.transportationList = list);

    this.$searchKeyInput
      .pipe(debounceTime(750))
      .subscribe(searchPredicate => this.searchByName(searchPredicate));
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  searchByName(searchPredicate: string): void {
    this.transportation.searchBy({ nameLike: searchPredicate })
      .pipe(takeUntil(this.$destroy))
      .subscribe(result => this.transportationList = result);
  }

}
