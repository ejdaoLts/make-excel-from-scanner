export const Links = [
  { icon: 'style', name: 'ChartJS', route: '/dashboard/pages/chart-js' },
  { icon: 'style', name: 'Flot', route: '/dashboard/pages/flot' },
  { icon: 'style', name: 'Inline', route: '/dashboard/pages/inline' },
  { icon: 'style', name: 'uPlot', route: '/dashboard/pages/uplot' },
];
export const Accordions = [
  {
    icon: 'style',
    title: 'Charts',
    links: [
      { name: 'ChartJS', route: '/dashboard/pages/chart-js' },
      { name: 'Flot', route: '/dashboard/pages/flot' },
      { name: 'Inline', route: '/dashboard/pages/inline' },
      { name: 'uPlot', route: '/dashboard/pages/uplot' },
    ],
  },
  {
    icon: 'local_activity',
    title: 'Ui Elements',
    links: [
      { name: 'Icons', route: '/dashboard/pages/icons' },
      { name: 'Buttons', route: '/dashboard/pages/buttons' },
    ],
  },
  {
    icon: 'local_activity',
    title: 'Extras',
    links: [
      { name: 'Login', route: '/session/login' },
      { name: 'Register', route: '/session/register' },
      { name: 'Forgot Password', route: '/session/forgot-password' },
      { name: 'Error 404', route: '/session/404' },
    ],
  },
];
