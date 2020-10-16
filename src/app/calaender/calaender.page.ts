import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calaender',
  templateUrl: './calaender.page.html',
  styleUrls: ['./calaender.page.scss'],
})
export class CalaenderPage implements OnInit {
  months = [
    { name: 'Jan' },
    { name: 'Feb' },
    { name: 'Mar' },
    { name: 'Apr' },
    { name: 'May' },
    { name: 'Jun' },
    { name: 'Jul' },
    { name: 'Aug' },
    { name: 'Sep' },
    { name: 'Oct' },
    { name: 'Nov' },
    { name: 'Dec' }
  ]
  weekdays = [
    { name: 'S' },
    { name: 'M' },
    { name: 'T' },
    { name: 'W' },
    { name: 'T' },
    { name: 'F' },
    { name: 'S' }
  ]

  events = [
    {
      date: '16-10-2020',
      event: [{
        id: 1,
        name: 'Birthday',
        color: '#0d680c'
      }, {
        id: 2,
        name: 'Aniversary',
        color: '#163a5c'
      }]
    },
    {
      date: '29-10-2020',
      event: [{
        id: 3,
        name: 'Holiday',
        color: '#f69aec'
      }]
    },
    {
      date: '17-11-2020',
      event: [{
        id: 4,
        name: 'My Birthday',
        color: '#a3cf7e'
      }]
    }
  ]

  monthCalenderView = []
  month = 0
  year = 0
  defaultDate = 0
  selected_month = 0
  defaultYear = 0
  selectedDate = 0
  showRemovebtn = false
  todayDate = 0
  todayMonth = 0
  todayYear = 0
  isPreMonthAvail = false

  month_dropdown_toggle_value = false

  constructor() { }

  ngOnInit() {
    let today_date_arr = new Date().toString().split(' ')
    const month_index = this.months.findIndex(month => month.name == today_date_arr[1])
    this.todayDate = parseInt(today_date_arr[2])
    this.todayMonth = month_index
    this.selected_month = month_index
    this.todayYear = parseInt(today_date_arr[3])
    this.selected_month = month_index
    this.getDaysInMonth(month_index, this.todayYear)
    this.getRandomColor()
  }


  selectMonth(month, year) {
    this.selected_month = month
    this.getDaysInMonth(month, year)
    this.toggleDropdown()
  }

  toggleDropdown() {
    this.month_dropdown_toggle_value = !this.month_dropdown_toggle_value
  }
  getDaysInMonth(month, year) {
    const previous_month = new Date(year, month, 0).getDate()
    const current_month = new Date(year, month);
    const starting_day = current_month.getDay()
    const days_view_in_calender = [];
    while (current_month.getMonth() === month) {
      let temp_date = null
      if (current_month.getFullYear() == this.todayYear && current_month.getMonth() == this.todayMonth && current_month.getDate() < this.todayDate) {
        temp_date = { isCurrentMonthDate: false, value: current_month.getDate() }
      } else {
        temp_date = { isCurrentMonthDate: true, value: current_month.getDate() }
      }
      const event = this.getEvent(current_month.getDate(), current_month.getMonth(), current_month.getFullYear())
      temp_date['event'] = event
      days_view_in_calender.push(temp_date);
      current_month.setDate(current_month.getDate() + 1);
    }
    for (let i = 0; i < starting_day; i++) {
      const temp_date = {
        isCurrentMonthDate: false,
        value: previous_month - i
      }
      const event = this.getEvent(current_month.getDate(), current_month.getMonth(), current_month.getFullYear())
      temp_date['event'] = event
      days_view_in_calender.unshift(temp_date)
    }
    let tempMonthCalenderView = []
    const rows_in_month_calender_view = Math.ceil(days_view_in_calender.length / 7)
    for (let i = 0; i < rows_in_month_calender_view; i++) {
      let month_calender_row = []
      for (let j = (i * 7); j < (i * 7 + 7); j++) {
        if (j < days_view_in_calender.length) {
          month_calender_row.push(days_view_in_calender[j])
        }
      }
      tempMonthCalenderView.push(month_calender_row)
    }
    let nextMonthValues = 1
    while (tempMonthCalenderView[tempMonthCalenderView.length - 1].length < 7) {
      const temp_date = { isCurrentMonthDate: false, value: nextMonthValues }
      const event = this.getEvent(current_month.getDate(), current_month.getMonth(), current_month.getFullYear())
      temp_date['event'] = event
      tempMonthCalenderView[tempMonthCalenderView.length - 1].push(temp_date)
      nextMonthValues = nextMonthValues + 1
    }
    this.monthCalenderView = tempMonthCalenderView

  }

  getEvent = (date, month, year) => {
    let event_date = date.toString() + '-' + (month + 1).toString() + '-' + year.toString()
    const index = this.events.findIndex(event => event.date == event_date)
    if (index != -1) {
      return this.events[index]['event']
    } else {
      return []
    }
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    console.log( '#' + ('000000' + color).slice(-6))
  }
}
