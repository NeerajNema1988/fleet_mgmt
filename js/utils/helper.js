import _ from "lodash";

export const fetchBusesInfo = async query => {
    const url =
        "https://sitetrakerrecruiting-developer-edition.na73.force.com/services/apexrest/getBusses";
    const rawResponse = await fetch(url);
    const response = await rawResponse.text();
    const result = JSON.parse(response) || [];
    return _.sortBy(result.filter(bus => bus.attributes.type === "Bus__c"), [
        "Bus_ID__c"
    ]);
    // const busInfo = _.sortBy(resultFilteredByBus, ["Bus_ID__c"]);
    // this.setState({
    //     busInfo,
    //     isResultLoaded: true
    // });
};

export const getSeatBasedPricing = bus =>
    bus.Maximum_Capacity__c <= 24 ? 120000 : 160000;

export const getMilesBasedDiscount = bus =>
    bus.Odometer_Reading__c > 100000
        ? ((bus.Odometer_Reading__c - 100000) * 0.1).toFixed(2)
        : 0;

export const getFeatureBasedPricing = bus =>
    bus.Has_Air_Conditioning__c ? getSeatBasedPricing(bus) * 3 / 100 : 0;

export const getYearsBasedPricing = bus =>
    bus.Year__c <= 1972 ? (getSeatBasedPricing(bus) * 34 / 100).toFixed(2) : 0;

export const calculateResaleValue = bus => {
    const priceBasedOnSeats = getSeatBasedPricing(bus);
    const pricebasedOnFeature = getFeatureBasedPricing(bus);
    const priceBasedOnYear = getYearsBasedPricing(bus);
    const discount = getMilesBasedDiscount(bus);
    const resaleValue = (
        priceBasedOnSeats +
        pricebasedOnFeature +
        priceBasedOnYear -
        discount
    ).toFixed(2);
    return {
        resaleValue,
        priceBasedOnSeats,
        pricebasedOnFeature,
        priceBasedOnYear,
        discount
    };
};
