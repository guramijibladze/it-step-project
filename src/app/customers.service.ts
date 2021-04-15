
export class CustomersService {
  customers: any = [
    {
      name: 'Golden Star',
       HotelAddress: 'Agmashenebeli Ave.199',
        City: 'Tbilisi',
         Descrption: 'The Hotel with 5 star Service',
          Image: 'https://media.timbu.com/img/h1406706/400/280/b1/flamingo-hotel-1406706-1.jpg',
          id: 785
    },
    {
      name: 'Golden Star',
       HotelAddress: 'Agmashenebeli Ave.199',
        City: 'Tbilisi',
         Descrption: 'The Hotel with 5 star Service',
          Image: 'https://media.timbu.com/img/h1406706/400/280/b1/flamingo-hotel-1406706-1.jpg',
          id: 854
    },
  ];

  getCustomers() {
    return this.customers
  }

  setCustomers(customer:any){
    this.customers.push(customer);
    console.log(this.customers)
  }

  deleteCustomer(id: number){
    let filteredCustomers = this.customers.filter((cust:any) => cust.id !== id);
    console.log(filteredCustomers);
    this.customers = filteredCustomers;
    console.log(this.customers)
  }

}

