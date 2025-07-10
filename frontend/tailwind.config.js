/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stripe: {
          blue: '#0085FF',
          purple: '#675DFF',
          gray: {
            50: '#F8F9FA',
            100: '#F0F0F0',
            200: '#EBEEF1',
            300: '#E5E7EB',
            400: '#898989',
            500: '#717171',
            600: '#444444',
            700: '#393B3E'
          },
          success: {
            50: '#CEF6BB',
            100: '#B4E1A2',
            500: '#05690D'
          }
        }
      },
      fontFamily: {
        'sf-pro': ['SF Pro', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'display': ['48px', { lineHeight: '58px', fontWeight: '700' }],
        'title': ['24px', { lineHeight: '29px', fontWeight: '400' }],
        'link': ['22px', { lineHeight: '27px', fontWeight: '600' }],
        'balance': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'label': ['16px', { lineHeight: '24px', fontWeight: '590' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'button': ['14px', { lineHeight: '20px', fontWeight: '590' }],
        'table-header': ['12px', { lineHeight: '20px', fontWeight: '700' }],
        'table-cell': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'table-amount': ['14px', { lineHeight: '20px', fontWeight: '590' }],
        'badge': ['12px', { lineHeight: '16px', fontWeight: '590' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      borderRadius: {
        'stripe': '4px'
      }
    },
  },
  plugins: [],
}
