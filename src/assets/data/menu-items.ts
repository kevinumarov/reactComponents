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
        key: 'charts-area',
        label: 'Area',
        url: '/charts/area',
        parentKey: 'charts',
      },
      {
        key: 'charts-bar',
        label: 'Bar',
        url: '/charts/bar',
        parentKey: 'charts',
      },
      {
        key: 'charts-bubble',
        label: 'Bubble',
        url: '/charts/bubble',
        parentKey: 'charts',
      },
      {
        key: 'charts-candle-stick',
        label: 'Candle Stick',
        url: '/charts/candlestick',
        parentKey: 'charts',
      },
      {
        key: 'charts-column',
        label: 'Column',
        url: '/charts/column',
        parentKey: 'charts',
      },
      {
        key: 'charts-heatmap',
        label: 'Heatmap',
        url: '/charts/heatmap',
        parentKey: 'charts',
      },
      {
        key: 'charts-line',
        label: 'Line',
        url: '/charts/line',
        parentKey: 'charts',
      },
      {
        key: 'charts-mixed',
        label: 'Mixed',
        url: '/charts/mixed',
        parentKey: 'charts',
      },
      {
        key: 'charts-timeline',
        label: 'Timeline',
        url: '/charts/timeline',
        parentKey: 'charts',
      },
      {
        key: 'charts-boxplot',
        label: 'Boxplot',
        url: '/charts/boxplot',
        parentKey: 'charts',
      },
      {
        key: 'charts-treemap',
        label: 'Treemap',
        url: '/charts/treemap',
        parentKey: 'charts',
      },
      {
        key: 'charts-pie',
        label: 'Pie',
        url: '/charts/pie',
        parentKey: 'charts',
      },
      {
        key: 'charts-radar',
        label: 'Radar',
        url: '/charts/radar',
        parentKey: 'charts',
      },
      {
        key: 'charts-radial-bar',
        label: 'Radial Bar',
        url: '/charts/radial-bar',
        parentKey: 'charts',
      },
      {
        key: 'charts-scatter',
        label: 'Scatter',
        url: '/charts/scatter',
        parentKey: 'charts',
      },
      {
        key: 'charts-polar-area',
        label: 'Polar Area',
        url: '/charts/polar',
        parentKey: 'charts',
      },
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