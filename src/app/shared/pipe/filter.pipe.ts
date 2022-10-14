import { Pipe, PipeTransform } from '@angular/core';
import { company } from 'src/app/company/model/company.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: company[], searchText: string): any {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(
      (item: any) =>
        item.companyname.toLowerCase().includes(searchText) ||
        item.companydescription.toLowerCase().includes(searchText) ||
        item.selecttag.toLowerCase().includes(searchText)
    );
  }
}
