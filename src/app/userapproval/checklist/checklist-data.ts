export interface clinicdata {
  name: string;
  email: string;
  phonenumber: string;
  address: string;
  city: string;
  state: string;
  image: string;
  banknumber: string;
  ifsc: string;
  bankbranch: string;
  gst: string;
}

export const clinicdat: clinicdata[] = [
  {
    name: 'Rajan clinic',
    email: 'example@gmail.com',
    phonenumber: '98765432123',
    image: 'assets/images/users/user.svg',
    address: '4, new street',
    city: 'chennai',
    state: 'Tamilnadu',
    banknumber: 'QWE234567890',
    ifsc: 'ERT12345678',
    bankbranch: 'Chennai',
    gst: '1234AS',
  },
];
