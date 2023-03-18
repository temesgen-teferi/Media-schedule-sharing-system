window.addEventListener('load', () => {
    schedules = JSON.parse(localStorage.getItem('schedules')) || [] || '';

    const newScheduleForm = document.querySelector('#new-schedule-form');



    newScheduleForm.addEventListener('submit', e => {
        e.preventDefault();

        const schedule = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        schedules.push(schedule);

        localStorage.setItem('schedules', JSON.stringify(schedules));

        e.target.reset();

        DisplaySchedules();
    })
    DisplaySchedules();
})

function DisplaySchedules() {
    const scheduleList = document.querySelector('#schedule-list');

    scheduleList.innerHTML = '';
    schedules.forEach(schedule => {
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');

        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');


        input.type = 'checkbox';
        input.checked = schedule.done;
        span.classList.add('bubble');

        if (schedule.category == 'television') {
            span.classList.add('television');
        } else {
            span.classList.add('radio')
        }

        content.classList.add('schedule-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${schedule.content}"
        readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);

        scheduleItem.appendChild(label);
        scheduleItem.appendChild(content);
        scheduleItem.appendChild(actions);

        scheduleList.appendChild(scheduleItem);

        if (schedule.done) {
            scheduleItem.classList.add('done');
        }
        input.addEventListener('click', e => {
            schedule.done = e.target.checked;
            localStorage.setItem('schedules', JSON.stringify(schedules));

            if (schedule.done) {
                scheduleItem.classList.add('done');
            } else {
                scheduleItem.classList.remove('done');
            }
            DisplaySchedules();
        })
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                schedule.content = e.target.value;
                localStorage.setItem('schedules', JSON.stringify(schedules));
                DisplaySchedules();
            })
        })
        deleteButton.addEventListener('click', e => {
            schedules = schedules.filter(t => t != schedule);
            localStorage.setItem('schedules', JSON.stringify(schedules));
            DisplaySchedules();
        })

    })
}