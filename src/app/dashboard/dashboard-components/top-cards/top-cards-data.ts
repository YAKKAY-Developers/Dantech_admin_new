export interface topcard {
  bgcolor: string;
  icon: string;
  title: string;
  subtitle: string;
  date:string
}

export const topcards: topcard[] = [
  {
    bgcolor: 'success',
    icon: 'bi bi-bag-check',
    title: '20',
    subtitle: 'Number of Orders today',
    date:'02-02-2024'
  },
  {
    bgcolor: 'warning',
    icon: 'bi bi-bag-check-fill',
    title: '50',
    subtitle: 'Total orders received',
    date:'02-02-2024'
  },
  {
    bgcolor: 'info',
    icon: 'bi bi-person-add',
    title: '15',
    subtitle: 'Orders to be assigned',
    date:'02-02-2024'
  },
  {
    bgcolor: 'primary',
    icon: 'bi bi-caret-right-square-fill',
    title: '12',
    subtitle: 'Orders in progress',
    date:'02-02-2024'
  },
  {
    bgcolor: 'info',
    icon: 'bi bi-pause-btn-fill',
    title: '4',
    subtitle: 'Order on hold',
    date:'02-02-2024'
  },
  {
    bgcolor: 'danger',
    icon: 'bi bi-x-octagon-fill',
    title: '2',
    subtitle: 'Oder on rejected ',
    date:'02-02-2024'
  },
];
