export interface userapprovaldata {
  organizationid: string;
  organizationname: string;
  organizationemail: string;
  organizationaddress: string;
  phonenumber: string;
  orgapproval: string;
}

export const approvallist: userapprovaldata[] = [
  {
    organizationid: 'O1234',
    organizationname: 'Raju clinic',
    organizationemail: 'example@google.com',
    organizationaddress: 'bos confo, sdfghjk',
    phonenumber: '0987654321',
    orgapproval: 'Waiting',
  },
  {
    organizationid: 'O1235',
    organizationname: 'Raja clinic',
    organizationemail: 'example@google.com',
    organizationaddress: 'bos confo, sdfghjk',
    phonenumber: '0987654321',
    orgapproval: 'Waiting',
  },
  {
    organizationid: 'O1236',
    organizationname: 'Rajajkh clinic',
    organizationemail: 'example@google.com',
    organizationaddress: 'bos confo, sdfghjk',
    phonenumber: '0987654321',
    orgapproval: 'Rejected',
  },
  {
    organizationid: 'O1237',
    organizationname: 'Rajini clinic',
    organizationemail: 'example@google.com',
    organizationaddress: 'bos confo, sdfghjk',
    phonenumber: '0987654321',
    orgapproval: 'Accepted',
  },
  {
    organizationid: 'O1238',
    organizationname: 'kala clinic',
    organizationemail: 'example@google.com',
    organizationaddress: 'bos confo, sdfghjk',
    phonenumber: '0987654321',
    orgapproval: 'Waiting',
  },
];
