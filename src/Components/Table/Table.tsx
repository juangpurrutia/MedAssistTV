import { View } from "react-native";
import React from "react";

interface TableProps {
    children: React.ReactNode;
}

export function Table({ children }: TableProps) {

    return (
        <View>
            {children}
        </View>
    )
}