import React from 'react';
import { ThemeProvider } from 'styled-components';
import { getDefaultTheme } from '@elliemae/pui-theme';
import { FilteredColumnWithDropdownMenuAddon } from './story/FilteredColumnWithDropdownMenuAddon';
import './index.css';
import 'sanitize.css';

const theme = getDefaultTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <FilteredColumnWithDropdownMenuAddon />
    </ThemeProvider>
  );
}
