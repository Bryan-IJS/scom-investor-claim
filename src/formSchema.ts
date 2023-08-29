import ScomNetworkPicker from '@scom/scom-network-picker';

const chainIds = [1, 56, 137, 250, 97, 80001, 43113, 43114];

const theme = {
    type: 'object',
    properties: {
        backgroundColor: {
            type: 'string',
            format: 'color'
        },
        fontColor: {
            type: 'string',
            format: 'color'
        },
        textSecondary: {
            type: 'string',
            title: 'Campaign Font Color',
            format: 'color'
        },
        // buttonBackgroundColor: {
        // 	type: 'string',
        // 	format: 'color'
        // },
        // buttonFontColor: {
        // 	type: 'string',
        // 	format: 'color'
        // }
    }
}

export default {
    dataSchema: {
        type: 'object',
        properties: {
            campaigns: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        chainId: {
                            type: 'number',
                            enum: chainIds,
                            required: true
                        },
                        campaignName: {
                            type: 'string',
                            required: true
                        },
                        campaignDesc: {
                            type: 'string'
                        },
                        dripAddress: {
                            type: 'string',
                            required: true
                        }
                    }
                }
            },
            dark: theme,
            light: theme
        }
    },
    uiSchema: {
        type: 'Categorization',
        elements: [
            {
                type: 'Category',
                label: 'General',
                elements: [
                    {
                        type: 'VerticalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/campaigns',
                                options: {
                                    detail: {
                                        type: 'VerticalLayout'
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: 'Category',
                label: 'Theme',
                elements: [
                    {
                        type: 'VerticalLayout',
                        elements: [
                            {
                                type: 'Control',
                                label: 'Dark',
                                scope: '#/properties/dark'
                            },
                            {
                                type: 'Control',
                                label: 'Light',
                                scope: '#/properties/light'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    customControls: {
        "#/properties/campaigns/properties/chainId": {
            render: () => {
                const networkPicker = new ScomNetworkPicker(undefined, {
                    type: 'combobox',
                    networks: chainIds.map(v => { return { chainId: v } })
                });
                return networkPicker;
            },
            getData: (control: ScomNetworkPicker) => {
                return control.selectedNetwork?.chainId;
            },
            setData: (control: ScomNetworkPicker, value: number) => {
                control.setNetworkByChainId(value);
            }
        }
    }
}