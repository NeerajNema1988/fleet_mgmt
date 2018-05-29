import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const printCulculationRules = () => {
    return (
        <View style={styles.Container}>
            <Text style={styles.TitleTextStyle}>Rules and Conditions</Text>
            <View style={styles.HeaderTitleStyle}>
                <Text style={styles.TextStyle}>
                    i. If the bus is a 24 passenger, the starting selling price
                    is $120,000
                </Text>
                <Text style={styles.TextStyle}>
                    ii. If the bus is a 36 passenger, the starting selling price
                    is $160,000
                </Text>
                <Text style={styles.TextStyle}>
                    {`iii. It should only be considered if it's current status is "Ready for Service"`}
                </Text>
                <Text style={styles.TextStyle}>
                    iv. For every mile over 100,000 on the odometer, the price
                    is reduced by $.10
                </Text>
                <Text style={styles.TextStyle}>
                    v. If the bus has an air conditioning system, Increase the
                    starting selling price by 3%
                </Text>
                <Text style={styles.TextStyle}>
                    vi. If the bus year is 1972 or older, consider it historic.
                    Increase the starting selling price by 34%
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        marginTop: 25,
        flexDirection: "column"
    },
    TitleTextStyle: {
        fontSize: 14,
        fontWeight: "700",
        textDecorationLine: "underline",
        paddingBottom: 8
    },
    TextStyle: {
        fontSize: 12,
        fontWeight: "600"
    }
});
