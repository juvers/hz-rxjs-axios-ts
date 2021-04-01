import React, {useState} from 'react';
import {
  I18n,
  IAbbreviationsProps,
  IDayProps,
  IPickerProps,
  IHeaderProps,
  IMainProps,
  IMainState,
} from '../models/interface';

const range = (length: number) => Array.from({length: length});

const convertDateToLocaleString = (arr: string[]): string[] => {
  return arr.reduce((acc: string[], curr: string): string[] => {
    return [...acc, new Date(curr).toLocaleDateString('en-CA')];
  }, []);
};

const isDateIn = (d: Date, arr: string[]) =>
  arr.includes(new Date(d).toLocaleDateString('en-CA'));

const sameDates = (d1: Date, d2: Date) => {
  // Preference for toLocaleDateString
  return (
    new Date(d1).toLocaleDateString('en-CA') ===
    new Date(d2).toLocaleDateString('en-CA')
  );
};

const deltaDate = (
  date: Date,
  yearDelta: number,
  monthDelta = 0,
  dayDelta = 0,
) => {
  return new Date(
    date.getFullYear() + yearDelta,
    date.getMonth() + monthDelta,
    date.getDate() + dayDelta,
  );
};

const abbreviationDays = (i18n: I18n) => {
  return range(7).map((_, i) =>
    i >= 7 ? i18n.weekdaysShort[i - 7] : i18n.weekdaysShort[i],
  );
};

const generateMatrix = (date: Date, weekStart: number) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const diff =
    (firstDayOfMonth.getDay() < weekStart ? 7 : 0) +
    firstDayOfMonth.getDay() -
    weekStart;
  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    firstDayOfMonth.getDate() - diff,
  );

  return range(6).map((row, i) => {
    return range(7).map((column, j) => {
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i * 7 + j,
      );
    });
  });
};

// dates conversion here
const testDatesArray = [
  '2021-03-02T00:00:00',
  '2021-03-03T00:00:00',
  '2021-03-04T00:00:00',
  '2021-03-10T00:00:00',
  '2021-03-11T00:00:00',
  '2021-03-04T00:00:00',
  '2021-03-15T00:00:00',
  '2021-03-16T00:00:00',
  '2021-03-25T00:00:00',
];

const convertedTestDates = convertDateToLocaleString(testDatesArray);

const DatePicker = ({
  cursor,
  weekStart,
  renderDay,
  renderHeader,
  renderAbbreviations,
}: IPickerProps): JSX.Element => {
  const matrix = generateMatrix(cursor, weekStart);
  return (
    <table className="hz-datepicker">
      <thead>
        {renderHeader()}
        {renderAbbreviations()}
      </thead>
      <tbody>
        {matrix.map((row) => (
          <tr key={'row' + row[0].toString()}>
            {row.map((date) => renderDay(date))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Day = ({
  day,
  date,
  cursor,
  onChange,
  onCursorChange,
}: IDayProps): JSX.Element => {
  const isSelected = sameDates(day, date);
  const isCursor = sameDates(day, cursor);
  const isToday = sameDates(day, new Date());
  const isUnavailable = isDateIn(day, convertedTestDates);
  const isPrevMonth =
    cursor.getMonth() === 0
      ? day.getMonth() === 11
      : day.getMonth() === cursor.getMonth() - 1;
  const isNextMonth =
    cursor.getMonth() === 11
      ? day.getMonth() === 0
      : day.getMonth() === cursor.getMonth() + 1;
  const isInThisMonth = !isPrevMonth && !isNextMonth && !isUnavailable;

  const classNames = ['day'];
  if (!isInThisMonth) {
    classNames.push('grayed');
  }
  if (isUnavailable) {
    classNames.push(...['grayed', 'notAllowed']);
  }
  if (isSelected && !isUnavailable) {
    classNames.push('selected');
  }
  if (isCursor) {
    classNames.push('cursor');
  }
  if (isToday) {
    classNames.push('today');
  }
  const props = {
    ...(isInThisMonth && {
      onClick: () => onChange(day),
      onMouseEnter: () => onCursorChange(day),
      onFocus: () => onCursorChange(day),
      tabIndex: 1,
    }),
  };

  return (
    <td {...props} className={classNames.join(' ')}>
      {day.getDate()}
    </td>
  );
};

const Abbreviations = ({i18n}: IAbbreviationsProps): JSX.Element => {
  return (
    <tr className="weekdays">
      {abbreviationDays(i18n).map((day: string) => (
        <td key={day} colSpan={1}>
          {day}
        </td>
      ))}
    </tr>
  );
};

const Header = ({
  i18n,
  cursor,
  prevMonthClick,
  nextMonthClick,
}: IHeaderProps): JSX.Element => {
  return (
    <tr>
      <th colSpan={1}>
        <button className="chevron" onClick={prevMonthClick}>
          ‹
        </button>
      </th>
      <th colSpan={5}>
        {i18n.months[cursor.getMonth()]} {cursor.getFullYear()}
      </th>
      <th colSpan={1}>
        <button className="chevron" onClick={nextMonthClick}>
          ›
        </button>
      </th>
    </tr>
  );
};

const Calendar = (props: IMainProps): JSX.Element => {
  const [state, setState] = useState<IMainState>({
    date: new Date(),
    cursor: new Date(),
    weekStart: 0,
  });

  const onChange = (date: Date) => {
    setState({...state, date});
  };

  const onCursorChange = (cursor: Date) => {
    setState({...state, cursor});
  };

  const prevMonthClick = () => {
    if (
      state.cursor.getMonth() <= new Date().getMonth() &&
      state.cursor.getFullYear() <= new Date().getFullYear()
    ) {
      return;
    }
    onCursorChange(deltaDate(state.cursor, 0, -1));
  };

  const nextMonthClick = () => {
    onCursorChange(deltaDate(state.cursor, 0, 1));
  };

  return (
    <DatePicker
      cursor={state.cursor}
      weekStart={state.weekStart}
      renderHeader={() => (
        <Header
          i18n={props.i18n}
          cursor={state.cursor}
          prevMonthClick={prevMonthClick}
          nextMonthClick={nextMonthClick}
        />
      )}
      renderDay={(day) => (
        <Day
          key={day.toString()}
          day={day}
          date={state.date}
          cursor={state.cursor}
          onChange={onChange}
          onCursorChange={onCursorChange}
        />
      )}
      renderAbbreviations={() => (
        <Abbreviations i18n={props.i18n} weekStart={state.weekStart} />
      )}
    />
  );
};

export default Calendar;
