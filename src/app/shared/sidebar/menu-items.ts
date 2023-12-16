import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/det/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
  },

  {
    path: '/auth/login',
    title: 'Login',
    icon: 'bi bi-box-arrow-in-right',
    class: 'disabled',
    extralink: false,
    submenu: [],
  },
  {
    path: '/auth/user/register',
    title: 'Add users',
    icon: 'bi bi-person-add',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '',
    title: 'Users',
    icon: 'bi bi-person-lines-fill',
    class: 'd-none',
    extralink: false,
    submenu: [
      {
        path: '/det/userapproval/approvedusers',
        title: 'Approved users',
        icon: 'bi bi-person-fill-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: '/det/userapproval/pendingusers',
        title: 'Pending approvals',
        icon: 'bi bi-person-fill-exclamation',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: '/det/userapproval/rejectedusers',
        title: 'Rejected approvals',
        icon: 'bi bi-person-fill-x',
        class: '',
        extralink: false,
        submenu: [],
      },
    ],
    expanded: false,
  },
  {
    path: '/det/pages/orders',
    title: 'Orders',
    icon: 'bi bi-box-seam',
    class: '',
    extralink: false,
    submenu: [],
  },

  // {
  //   path: '/pages/toporders',
  //   title: 'All orders',
  //   icon: 'bi bi-file-earmark-text',
  //   class: '',
  //   extralink: false,
  //   submenu: [],
  // },

  // {
  //   path: '/component/alert',
  //   title: 'Alert',
  //   icon: 'bi bi-bell',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/badges',
  //   title: 'Badges',
  //   icon: 'bi bi-patch-check',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/buttons',
  //   title: 'Button',
  //   icon: 'bi bi-hdd-stack',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/card',
  //   title: 'Card',
  //   icon: 'bi bi-card-text',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/dropdown',
  //   title: 'Dropdown',
  //   icon: 'bi bi-menu-app',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/pagination',
  //   title: 'Pagination',
  //   icon: 'bi bi-dice-1',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/nav',
  //   title: 'Nav',
  //   icon: 'bi bi-pause-btn',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/table',
  //   title: 'Table',
  //   icon: 'bi bi-layout-split',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/about',
  //   title: 'About',
  //   icon: 'bi bi-people',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // }
];
