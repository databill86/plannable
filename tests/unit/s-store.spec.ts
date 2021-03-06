import Store from '@/store';
const store = new Store();
const { schedule } = store;

beforeAll(() => {
    window.confirm = () => true;
});

test('schedule basic', () => {
    schedule.clear();
    schedule.newProposed();
    expect(schedule.proposedSchedules.length).toBe(2);
    expect(schedule.proposedScheduleIndex).toBe(1);
    schedule.switchProposed(0);
    expect(schedule.proposedScheduleIndex).toBe(0);
    schedule.copyCurrent();
    expect(schedule.proposedScheduleIndex).toBe(2);
    schedule.switchSchedule(false);
    expect(schedule.currentSchedule).toBe(schedule.proposedSchedule);

    schedule.deleteProposed();
    expect(schedule.proposedScheduleIndex).toBe(1);
    schedule.copyCurrent();
    schedule.switchProposed(1);
    schedule.deleteProposed();
    expect(schedule.proposedScheduleIndex).toBe(1);
    schedule.fromJSON(schedule.toJSON());

    schedule.fromJSON({});
    expect(schedule).toEqual(schedule.getDefault());
});

test('generated', () => {
    schedule.clear();
    schedule.switchPage(0);

    schedule.newProposed();
    expect(schedule.proposedSchedules.length).toBe(2);
    schedule.currentSchedule.update('cs21105', -1);
    store.generateSchedules();
    expect(schedule.cpIndex).toBe(1);
    schedule.recomputeAll();

    schedule.copyCurrent();
    schedule.switchPage(-1);
    schedule.switchPage(10000);
    schedule.deleteProposed();
    schedule.deleteProposed();
    expect(schedule.cpIndex).toBe(-1);

    schedule.currentSchedule.update('cs21105', -1);
    store.generateSchedules();
    expect(schedule.cpIndex).toBe(0);
    schedule.clear();
    expect(schedule.currentSchedule.empty()).toBe(true);
});
