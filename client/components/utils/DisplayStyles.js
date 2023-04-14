import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 0,
    borderRadius: '5px',
    marginRight: '10px',
    height: '391px',
    ...draggableStyle,
  });
  
  const getItemStyle2 = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    borderRadius: '5px',
    marginRight: '10px',
    ...draggableStyle,
  });
  
  const getItemStyle3 = (isDragging) => ({
    userSelect: 'none',
    position: 'relative',
    background: isDragging ? 'rgba(0, 0, 0, 0.5)' : ('null', isDragging = false),
    opacity: isDragging ? .8 : (2, isDragging = false),
    
  });
  
  const getListStyle = isDraggingOver => ({
    margin: 'auto',
    marginTop: '50px',
    background: isDraggingOver ? 'cornsilk' : '#E5E3E3',
    transition: 'background-color .2s ease',
    display: 'flex',
    borderRadius: '10px',
    height: '398px',
  });
  
  const getListStyle2 = (isDraggingOver, rosterVal) => ({
    margin: 'auto',
    marginTop: '50px',
    background: isDraggingOver ? 'cornsilk' : '#E5E3E3',
    transition: 'background-color .2s ease',
    display: 'flex',
    borderRadius: '10px',
    height: '258px',
  });

  const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
  };
  
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };

  const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 95%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  //sle
  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #E5E3E3;
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => ` 
  margin: auto;
  width: 90%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  `,
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 375px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

  export { getItemStyle, getItemStyle2, getItemStyle3, getListStyle, getListStyle2, TabsList, TabPanel, Tab, TabsUnstyled };