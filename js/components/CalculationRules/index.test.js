import React from "react";
import { shallow } from "enzyme";
import { printCulculationRules } from "./your-module";

describe("printCulculationRules", () => {
  it("renders the component correctly", () => {
    const wrapper = shallow(printCulculationRules());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the title correctly", () => {
    const wrapper = shallow(printCulculationRules());
    expect(wrapper.find("Text.TitleTextStyle").text()).toEqual("Rules and Conditions");
  });

  it("renders the calculation rules correctly", () => {
    const wrapper = shallow(printCulculationRules());
    const rules = wrapper.find("View.HeaderTitleStyle Text.TextStyle");

    expect(rules).toHaveLength(6);
    expect(rules.at(0).text()).toEqual("i. If the bus is a 24 passenger, the starting selling price is $120,000");
    expect(rules.at(1).text()).toEqual("ii. If the bus is a 36 passenger, the starting selling price is $160,000");
    expect(rules.at(2).text()).toEqual("iii. It should only be considered if it's current status is \"Ready for Service\"");
    expect(rules.at(3).text()).toEqual("iv. For every mile over 100,000 on the odometer, the price is reduced by $.10");
    expect(rules.at(4).text()).toEqual("v. If the bus has an air conditioning system, Increase the starting selling price by 3%");
    expect(rules.at(5).text()).toEqual("vi. If the bus year is 1972 or older, consider it historic. Increase the starting selling price by 34%");
  });

  it("has the correct styles", () => {
    const wrapper = shallow(printCulculationRules());

    expect(wrapper.find("View.Container").prop("style")).toEqual({ marginTop: 25, flexDirection: "column" });
    expect(wrapper.find("Text.TitleTextStyle").prop("style")).toEqual({ fontSize: 14, fontWeight: "700", textDecorationLine: "underline", paddingBottom: 8 });
    expect(wrapper.find("Text.TextStyle").prop("style")).toEqual({ fontSize: 12, fontWeight: "600" });
  });
});
