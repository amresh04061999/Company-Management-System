import { Pipe, PipeTransform } from '@angular/core';
import { Company } from 'src/app/company/model/company.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Company[], searchText: string): any {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(
      (item: any) =>
        item.companyname.includes(searchText) ||
        item.companydescription.includes(searchText) 
    );
  }
}
