export interface Address {
  userId: string,
  street: string,
  neighborhood: string,
  number: string,
  city: string,
  state: string,
  zipCode: string,
  complement: string
}

export interface User {
  phone: string,
  name: string,
  email: string,
  addresses: [Address]
}

