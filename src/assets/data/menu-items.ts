import type { MenuItemType } from '@/types/menu'

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'general',
    label: 'GENERAL',
    isTitle: true,
  },
  {
    key: 'dashboards',
    icon: 'iconamoon:home-duotone',
    label: 'Dashboards',
    children: [
      {
        key: 'dashboard-analytics',
        label: 'Analytics',
        url: '/dashboard/analytics',
        parentKey: 'dashboards',
      },
      {
        key: 'dashboard-finance',
        label: 'Finance',
        url: '/dashboard/finance',
        parentKey: 'dashboards',
      },
      {
        key: 'dashboard-sales',
        label: 'Sales',
        url: '/dashboard/sales',
        parentKey: 'dashboards',
      },
    ],
  },
  {
    key: 'charts',
    icon: 'iconamoon:3d-duotone',
    label: 'Survey Analysis',
    children: [
      {
        key: 'charts-sankey',
        label: 'Sankey',
        url: '/charts/sankey',
        parentKey: 'charts',
      },
      {
        key: 'charts-tangled-tree',
        label: 'Tangled Tree',
        url: '/charts/tangled-tree',
        parentKey: 'charts',
      },
      {
        key: 'charts-diverging-bar',
        label: 'Diverging Bar',
        url: '/charts/diverging-bar',
        parentKey: 'charts',
      },
      {
        key: 'charts-indented-tree',
        label: 'Indented Tree',
        url: '/charts/indented-tree',
        parentKey: 'charts',
      },
    ],
  },
]