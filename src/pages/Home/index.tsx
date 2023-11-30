/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Box } from '../../Components/Box';
import { Cell } from '../../Components/Table/Cell';
import { Header } from '../../Components/Table/Header';
import { Row } from '../../Components/Table/Row';
import { Table } from '../../Components/Table/Table';
import { Title } from '../../Components/Title';
import { useStatus } from '../../hooks/useStatus';
import { useVersatility, Versatility } from '../../hooks/useVersatility';
import Moment from 'moment';
import { uuid } from "../../utils/uuid";
import { sleep } from '../../utils/sleep';
import { Carousel } from '../../Components/Carousel';


export function Home() {

    const ref = useRef<FlatList>(null);

    const status = useStatus();

    const versatilities = useVersatility();
    const [alertVersatilityItems, setAlertVersatilityItems] = useState<Versatility[]>([]);

    const [allVersatilityItems, setAllVersatilityItems] = useState<Versatility[]>([]);
    const [allVersatilityIndex, setAllVersatilityIndex] = useState<number>(0);


    useEffect(() => {

        const id = setInterval(() => {
            setAllVersatilityIndex(index => {
                const length = allVersatilityItems.length;
                if (length === 0) {
                    return -1;
                }

                if (index < length - 1) {
                    return index + 1;
                }
                else if (index === length - 1) {
                    return 0;
                }

                return 0;

            });
        }, 3000);
        return () => clearInterval(id);

    }, [allVersatilityItems])

    useEffect(() => {
        try {
            if (allVersatilityIndex != -1) {
                ref.current?.scrollToIndex({
                    index: allVersatilityIndex,
                    animated: false,
                });
            }
        }
        catch { }
    }, [allVersatilityIndex])


    useEffect(() => {

        if (versatilities.data) {
            const allVersatilityItemsData = versatilities.data.data;
            setAllVersatilityItems(allVersatilityItemsData);

            const alertVersatilityItemsData = versatilities.data.data.filter(versatiliry => versatiliry.alerta === "Mudança de Consultório");
            setAlertVersatilityItems(alertVersatilityItemsData);
        }
        else {
            setAllVersatilityItems([])
            setAlertVersatilityItems([])
        }



    }, [versatilities.data])



    const isLoading = status.isLoading
        || status.isFetching
        || versatilities.isLoading
        || versatilities.isFetching;

    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#171923',
            padding: 5,
        }}>

            <Box>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 10,
                        position: 'relative'
                    }}>
                    {isLoading ? (
                        <ActivityIndicator
                            color={"yellow"}
                            style={{
                                width: 25,
                                height: 25,
                                marginRight: 5
                            }} />
                    ) : (
                        <Image
                            source={require('../../assets/logo.png')}
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: 'contain',
                                marginRight: 5
                            }} />
                    )}

                    <Title
                        text="MedAssistTV - Status do paciente"
                    />

                    {
                        status.data ? (
                            <Text style={{
                                position: "absolute",
                                right: 10,
                                top: 15,
                                color: "white",
                                fontSize: 8
                            }}>
                                {status.data.dateTime}
                            </Text>
                        ) : null
                    }

                </View>

                <Table>
                    <Row>
                        <Header width={70} text="Sala" />
                        <Header width={80} text="Doutor(a)" />
                        <Header width={80} text="Paciente" />
                        <Header
                            width={80}
                            text="Check-in"
                            alignItems='center'
                            textAlign='center' />
                        <Header
                            width={80}
                            text="Medicação necessária"
                            alignItems='center'
                            textAlign='center' />
                        <Header width={100} text="Inicio Previsto" />
                        <Header width={110} text="Processamento" />
                        <Header width={80} text="Liberação" />
                        <Header width={80} text="Status" />
                        <Header width={80} text="Consulta" />
                        {/* <Header width={90} text="Pesagens" /> */}
                    </Row>

                    <FlatList
                        style={{
                            maxHeight: 300,
                        }}
                        data={status.data?.data}
                        keyExtractor={item => item.id}
                        renderItem={({ item: statusItem }) => {
                            return (
                                <Row>
                                    <Cell width={70} text="Sala N°" />
                                    {/* <Cell width={70} text={item.} /> */}
                                    <Cell width={80} text="Nome do Médico" />
                                    <Cell width={80} text="Nome do Paciente" />
                                    <Cell
                                        width={80}
                                        text="Feito ou Não Feito"
                                        textAlign="center" />
                                    <Cell
                                        width={80}
                                        text="Sim ou Não"
                                        textAlign="center" />
                                    <Cell width={100} text={Moment(statusItem?.inicioPrevisto, 'YYYY-MM-DDTHH:mm:ss').format("DD/MM/yyyy HH:mm")} />
                                    <Cell
                                        width={110}
                                        text={statusItem.processamento}
                                        backgroundColor={statusItem?.processamento === "Em Processamento" ||
                                            statusItem?.processamento === "Concluído" ||
                                            statusItem?.processamento === "Adiantado" ? "green" : "default"} />

                                    <Cell
                                        width={80}
                                        text={statusItem.liberacao.replace("<BR/>", "\n")}
                                        backgroundColor=
                                        {!statusItem.liberacao.includes("<BR/>") ? "default" :
                                            statusItem.liberacao.substring(statusItem.liberacao.indexOf('<BR/>') + 5).startsWith("-") ? "green" :
                                                isNaN(Number(statusItem.liberacao.substring(statusItem.liberacao.indexOf("<BR/>", 5)))) ? "red" : "yellow"
                                        } />

                                    <Cell
                                        width={80}
                                        text={statusItem.desempenho.replace("<BR/>", "\n")}
                                        backgroundColor=
                                        {!statusItem.desempenho.includes("<BR/>") ? "default" :
                                            statusItem.desempenho.substring(statusItem.desempenho.indexOf('<BR/>') + 5).startsWith("-") ? "green" :
                                                isNaN(Number(statusItem.desempenho.substring(statusItem.desempenho.indexOf("<BR/>", 5)))) ? "red" : "yellow"
                                        } 
                                    />

                                    <Cell
                                        width={80}
                                        text={statusItem.abastecimento.replace("<BR/>", "\n")}
                                        backgroundColor={statusItem.abastecimento.toUpperCase().includes("CONCLUÍDO") ? "green" 
                                        : statusItem.abastecimento.toUpperCase().includes("ATRASADO") ? "red" 
                                        : "default"}                                        
                                    />
                                </Row>
                            )
                        }}
                    />


                </Table>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    maxHeight: 145,
                    height: 145,
                }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#2D3748',
                        marginRight: 5,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        maxHeight: 145,
                    }}>
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: '#171923',
                                paddingLeft: 7,
                                paddingRight: 3,
                                paddingTop: 5,
                                paddingBottom: 5,
                            }}>
                            <Text style={{
                                color: 'white',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 8,
                            }}>
                                Mudança de consultório
                            </Text>
                        </View>
                        <Carousel
                            items={alertVersatilityItems}
                            interval={5000}
                            textWhenEmpty="Nenhuma mudança de consultório"
                            renderItem={(item) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            padding: 10,
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            maxHeight: 120,
                                            flex: 1,
                                        }}>
                                        <Image
                                            source={require("../../assets/operator.png")}
                                            style={{
                                                width: 35,
                                                height: 35,
                                                resizeMode: 'contain',
                                                marginRight: 10,
                                            }} />
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}>Nome médico(a)</Text>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                color: 'white'
                                            }}>Sua sala
                                            {/* {item.estacaoDeTrabalho} */}
                                        </Text>
                                    </View>
                                )
                            }}
                        />

                    </View>
                    <View style={{
                        flex: 1,
                        marginLeft: 5,
                        maxHeight: 145
                    }}>
                        <Table>
                            <Row>
                                <Header text="Nome médico" width="33%" />
                                <Header text="Seu consultório" width="33%" />
                                <Header text="Algum alerta" width="33%" />
                            </Row>
                            <FlatList
                                ref={ref}
                                style={{
                                    maxHeight: 123,
                                }}
                                data={allVersatilityItems}
                                initialScrollIndex={allVersatilityIndex == -1 ? null : allVersatilityIndex}
                                keyExtractor={(item) => item.id}
                                onScrollToIndexFailed={info => {
                                    sleep(500).then(() => {
                                        ref.current?.scrollToIndex({ index: info.index, animated: false });
                                    }).catch(() => { });
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <Row>
                                            {/* <Cell width="33%" text={item.nome} /> */}
                                            <Cell width="33%" text="Nome médico(a)" />
                                            <Cell width="33%" text="Sua sala" />
                                            <Cell width="33%" text={item.alerta} backgroundColor={item.alerta === "Mudança de Setor" ? "red" : "default"} />
                                        </Row>
                                    )
                                }}>
                            </FlatList>
                        </Table>
                    </View>
                </View>
            </Box>
        </View>
    )
}
