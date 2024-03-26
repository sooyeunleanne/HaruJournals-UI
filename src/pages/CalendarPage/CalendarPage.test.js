import React from 'react';
import { shallow, render, mount } from 'enzyme';
import CalendarPage from './CalendarPage';

describe('CalendarPage', () => {
  let props;
  let shallowCalendarPage;
  let renderedCalendarPage;
  let mountedCalendarPage;

  const shallowTestComponent = () => {
    if (!shallowCalendarPage) {
      shallowCalendarPage = shallow(<CalendarPage {...props} />);
    }
    return shallowCalendarPage;
  };

  const renderTestComponent = () => {
    if (!renderedCalendarPage) {
      renderedCalendarPage = render(<CalendarPage {...props} />);
    }
    return renderedCalendarPage;
  };

  const mountTestComponent = () => {
    if (!mountedCalendarPage) {
      mountedCalendarPage = mount(<CalendarPage {...props} />);
    }
    return mountedCalendarPage;
  };  

  beforeEach(() => {
    props = {};
    shallowCalendarPage = undefined;
    renderedCalendarPage = undefined;
    mountedCalendarPage = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
