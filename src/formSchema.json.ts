const theme = {
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

export default {
    general: {
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
                                enum: [1, 56, 137, 250, 97, 80001, 43113, 43114],
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
                }
            }
        },
        uiSchema: {
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
    },
    theme: {
        dataSchema: {
            type: 'object',
            properties: {
                "dark": {
                    type: 'object',
                    properties: theme
                },
                "light": {
                    type: 'object',
                    properties: theme
                }
            }
        }
    }
}