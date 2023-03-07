import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import ScheduleSummaryContainer from '../ScheduleSummaryContainer'
import store from '../../../src/store/store'

describe('ScheduleSummaryContainer', () => {
  test('should render the component', () => {
    const props = {
      validationMessages: {},
      scheduleState: {
        summary: {}
      },
      complianceReport: {
        hasSnapshot: true,
        summary: {
          dieselClassDeferred: 1,
          creditsOffsetB: 1,
          dieselClassPreviouslyRetained: 1,
          dieselClassRetained: 1,
          gasolineClassDeferred: 1,
          gasolineClassObligation: 1,
          gasolineClassPreviouslyRetained: 1,
          gasolineClassRetained: 1,
          creditsOffset: 1,
          creditsOffsetA: true
        }
      },
      snapshot: {
        summary: {
          lines: []
        }
      },
      recomputeRequest: jest.fn(),
      validating: true,
      valid: false,
      readOnly: true
    }

    const component = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <ScheduleSummaryContainer {...props} />
        </Provider>
      </BrowserRouter>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should rerender component with no readonly flag', () => {
    const props = {
      validationMessages: {},
      complianceReport: {
        hasSnapshot: true,
        summary: {
          dieselClassDeferred: 1,
          creditsOffsetB: 1,
          dieselClassPreviouslyRetained: 1,
          dieselClassRetained: 1,
          gasolineClassDeferred: 1,
          gasolineClassObligation: 1,
          gasolineClassPreviouslyRetained: 1,
          gasolineClassRetained: 1,
          creditsOffset: 1,
          creditsOffsetA: true
        }
      },
      scheduleState: {
      },
      snapshot: {
        summary: {
          lines: []
        }
      },
      recomputeRequest: jest.fn(),
      validating: true,
      readOnly: true,
      updateScheduleState: jest.fn()
    }
    let component = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <ScheduleSummaryContainer {...props} />
        </Provider>
      </BrowserRouter>
    )
    const updatedProps = {
      ...props,
      readOnly: false
    }
    component = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <ScheduleSummaryContainer {...updatedProps} />
        </Provider>
      </BrowserRouter>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('should render component with no complianceReport.snapshot', () => {
    const props = {
      complianceReport: {
        summary: {
          dieselClassDeferred: 1,
          creditsOffsetB: 1,
          dieselClassPreviouslyRetained: 1,
          dieselClassRetained: 1,
          gasolineClassDeferred: 1,
          gasolineClassObligation: 1,
          gasolineClassPreviouslyRetained: 1,
          gasolineClassRetained: 1,
          creditsOffset: 1,
          creditsOffsetA: true
        }
      },
      scheduleState: {
      },
      snapshot: {
        summary: {
          lines: []
        }
      },
      readOnly: true,
      updateScheduleState: jest.fn(),
      loadInitialState: jest.fn(),
      recomputeRequest: jest.fn()

    }
    const component = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <ScheduleSummaryContainer {...props} />
        </Provider>
      </BrowserRouter>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('should render component with recomputeRequest and loadInitialState', () => {
    const props = {
      validationMessages: {},
      scheduleState: {},
      complianceReport: {
        hasSnapshot: false,
        summary: {
          dieselClassDeferred: 1,
          creditsOffsetB: 1,
          dieselClassPreviouslyRetained: 1,
          dieselClassRetained: 1,
          gasolineClassDeferred: 1,
          gasolineClassObligation: 1,
          gasolineClassPreviouslyRetained: 1,
          gasolineClassRetained: 1,
          creditsOffset: 1,
          creditsOffsetA: true
        }
      },
      snapshot: {
        summary: {
          lines: []
        }
      },
      readOnly: false,
      updateScheduleState: jest.fn(),
      recomputeRequest: jest.fn()
    }
    const component = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <ScheduleSummaryContainer {...props} />
        </Provider>
      </BrowserRouter>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render component with recomputing flag', () => {
    const props = {
      updateScheduleState: jest.fn(),
      recomputeRequest: jest.fn(),
      validationMessages: {},
      complianceReport: {
        hasSnapshot: false,
        summary: {
          dieselClassDeferred: 1,
          creditsOffsetB: 1,
          dieselClassPreviouslyRetained: 1,
          dieselClassRetained: 1,
          gasolineClassDeferred: 1,
          gasolineClassObligation: 1,
          gasolineClassPreviouslyRetained: 1,
          gasolineClassRetained: 1,
          creditsOffset: 1,
          creditsOffsetA: true
        }
      },
      scheduleState: {},
      snapshot: {
        summary: {
          lines: []
        }
      },
      recomputing: true,
      readOnly: false
    }
    const component = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <ScheduleSummaryContainer {...props} />
        </Provider>
      </BrowserRouter>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
