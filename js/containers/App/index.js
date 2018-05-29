import React from "react";
import _ from "lodash";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Picker,
    TouchableOpacity
} from "react-native";
import * as helper from "../../utils/helper";
import * as Rules from "../../components/CalculationRules";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResultLoaded: false,
            showPicker: false,
            selectedBusName: null,
            selectedBusInfo: {},
            calculationDetails: {},
            busInfo: []
        };
    }

    componentDidMount = async () => {
        const busInfo = await helper.fetchBusesInfo();
        this.setState({
            busInfo,
            isResultLoaded: true
        });
    };

    renderPickerItems = () => {
        return this.state.busInfo.map((bus, idx) => (
            <Picker.Item
                key={idx}
                label={bus.Bus_ID__c}
                value={bus.Bus_ID__c}
            />
        ));
    };

    renderPicker = () => (
        <View style={styles.pickerStyle}>
            <Picker
                itemStyle={{ fontSize: 22 }}
                selectedValue={this.state.selectedBusName}
                onValueChange={(itemValue, itemIndex) => {
                    const selectedBusInfo = this.state.busInfo[itemIndex];
                    this.setState(
                        {
                            selectedBusName: itemValue,
                            selectedBusInfo,
                            showPicker: false
                        },
                        () => {
                            const calculationDetails = helper.calculateResaleValue(
                                selectedBusInfo
                            );
                            this.setState({ calculationDetails });
                        }
                    );
                }}
            >
                {this.renderPickerItems()}
            </Picker>
        </View>
    );

    renderCalculationDetails = () => {
        const { resaleValue } = this.state.calculationDetails;
        if (!resaleValue) return null;
        return (
            <View style={styles.DetailViewContainer}>
                <Text style={styles.DetailTitleStyle}>
                    Resale value of the bus{" "}
                    {this.state.selectedBusInfo.Bus_ID__c} is calculated as
                    follow:
                </Text>
                <View style={{ margin: 5, borderWidth: 1 }}>
                    <View style={styles.DetailContainer}>
                        <Text style={styles.DetailTextStyle}>
                            Number of Seats:
                        </Text>
                        <Text style={styles.DetailTextStyle}>
                            {this.state.selectedBusInfo.Maximum_Capacity__c}
                        </Text>
                    </View>
                    <View style={styles.DetailContainer}>
                        <Text style={styles.DetailTextStyle}>
                            Starting selling price of{" "}
                            {this.state.selectedBusInfo.Maximum_Capacity__c}{" "}
                            seater bus is :
                        </Text>
                        <Text style={styles.DetailTextStyle}>
                            {this.state.calculationDetails.priceBasedOnSeats}
                        </Text>
                    </View>
                </View>
                <View style={{ margin: 5, borderWidth: 1 }}>
                    <View style={styles.DetailContainer}>
                        <Text style={styles.DetailTextStyle}>
                            Odometer reading:
                        </Text>
                        <Text style={styles.DetailTextStyle}>
                            {this.state.selectedBusInfo.Odometer_Reading__c}
                        </Text>
                    </View>

                    <View style={styles.DetailContainer}>
                        <Text style={styles.DetailTextStyle}>
                            Discount for every mile over 100,000 :
                        </Text>
                        <Text style={styles.DetailTextStyle}>
                            {this.state.calculationDetails.discount}
                        </Text>
                    </View>
                </View>

                <View style={{ margin: 5, borderWidth: 1 }}>
                    <View style={styles.DetailContainer}>
                        <Text style={styles.DetailTextStyle}>
                            Does bus have air conditioning system:
                        </Text>
                        <Text style={styles.DetailTextStyle}>
                            {this.state.selectedBusInfo.Has_Air_Conditioning__c
                                ? "Yes"
                                : "No"}
                        </Text>
                    </View>
                    <View style={styles.DetailContainer}>
                        <Text style={styles.DetailTextStyle}>
                            Extra charge of air conditioning system :
                        </Text>
                        <Text style={styles.DetailTextStyle}>
                            {this.state.calculationDetails.pricebasedOnFeature}
                        </Text>
                    </View>
                </View>

                <View style={{ margin: 5, borderWidth: 1 }}>
                    <View style={styles.DetailContainer}>
                        <Text style={styles.DetailTextStyle}>
                            Bus manufacturing year:
                        </Text>
                        <Text style={styles.DetailTextStyle}>
                            {this.state.selectedBusInfo.Year__c}
                        </Text>
                    </View>
                    <View style={styles.DetailContainer}>
                        <Text style={styles.DetailTextStyle}>
                            Extra price if the bus year is 1972 or older :
                        </Text>
                        <Text style={styles.DetailTextStyle}>
                            {this.state.calculationDetails.priceBasedOnYear}
                        </Text>
                    </View>
                </View>

                {Rules.printCulculationRules()}
            </View>
        );
    };

    renderContainer = () => (
        <ScrollView style={styles.Container}>
            <View style={styles.HeaderContainer}>
                <Text style={styles.AppTitleStyle}>Fleet Management</Text>
            </View>
            <View style={styles.MainContainer}>
                <View style={styles.FilterContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            this.setState({
                                showPicker: !this.state.showPicker
                            })
                        }
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text style={styles.TitleStyle}>
                                {this.state.selectedBusName
                                    ? "Bus: "
                                    : "Please Select Bus"}
                            </Text>
                            <Text style={styles.TitleStyle}>
                                {this.state.selectedBusName
                                    ? this.state.selectedBusName
                                    : ""}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.showPicker && this.renderPicker()}
                </View>
                <View style={styles.seperator} />
                <View style={styles.ResultContainer}>
                    <Text style={styles.TitleStyle}>Resale Value:</Text>
                    <Text style={styles.TitleStyle}>
                        ${this.state.calculationDetails.resaleValue > 0
                            ? this.state.calculationDetails.resaleValue
                            : 0}
                    </Text>
                </View>
            </View>
            {this.renderCalculationDetails()}
        </ScrollView>
    );
    render() {
        return this.state.isResultLoaded ? this.renderContainer() : null;
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        margin: 4,
        marginTop: 25
    },
    HeaderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 4,
        margin: 1
    },
    AppTitleStyle: {
        padding: 4,
        margin: 1,
        fontSize: 28,
        fontWeight: "700"
    },
    MainContainer: {
        padding: 4,
        margin: 1
    },
    FilterContainer: {
        padding: 4,
        margin: 1,
        borderWidth: 1
    },
    seperator: {
        margin: 5
    },
    ResultContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 4,
        margin: 1,
        borderWidth: 1
    },
    DetailViewContainer: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    DetailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 4,
        margin: 1
    },
    DetailTitleStyle: {
        fontSize: 16
    },
    DetailTextStyle: {
        fontSize: 14
    },
    TitleStyle: {
        fontSize: 22,
        fontWeight: "600"
    }
});
