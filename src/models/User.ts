export interface User {
    userId: number;
    name: string;
    age: number;
    gender: string | null;
    height: string;
    weight: string;
    phoneNumber: string;
    primaryAddress: {
      buildingNumber: string;
      street: string;
      aptUnitNumber: string;
      zipCode: string;
      city: string;
      state: string;
      country: string;
    };
  }