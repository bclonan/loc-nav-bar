import {
  shallowMount
} from '@vue/test-utils'
import SimpleNavBar from "@/components/SimpleNavBar"

describe('SimpleNavBar.vue', () => {
  it('Changes the left property in data and runs getDimensions method to ensure the left property is not updated', async () => {
    const wrapper = shallowMount(SimpleNavBar)

    await wrapper.setData({
      left: 2
    })
    wrapper.vm.getDimensions()
    expect(wrapper.vm.left).toBe(2)
  })

  it('Updates the dimensions of the current selected navigation item and applies the style', async () => {
    const wrapper = shallowMount(SimpleNavBar)

    await wrapper.setData({
      left: 2,
      right: 22,
      width: 33
    })
    wrapper.vm.setNewDimensions(wrapper.vm.left, wrapper.vm.right, wrapper.vm.width)
    expect(wrapper.vm.slidingBar).toEqual({
      "height": "2px",
      "left": "2px",
      "position": "absolute",
      "right": "22px",
      "width": "33px"
    })
  })
})