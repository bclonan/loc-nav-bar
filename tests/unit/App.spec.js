import {
    shallowMount
} from '@vue/test-utils'
import App from "@/App"

function getTimeInNYC(offset) {
    var dt, utcFormattedDate, finalDate;
    dt = new Date();

    utcFormattedDate = dt.getTime() + dt.getTimezoneOffset() * 60000;

    finalDate = new Date(utcFormattedDate + 3600000 * offset);


    return finalDate.toLocaleTimeString();
}

describe('App.vue', () => {
    it('Returns the Time in Ney York City', async () => {
        const wrapper = shallowMount(App)


        const nycTime = getTimeInNYC("-4");
        await wrapper.setData({
            activeTab: 1
        })
        wrapper.vm.startClock()
        expect(wrapper.vm.selectedTime).toBe(nycTime)
    })


})