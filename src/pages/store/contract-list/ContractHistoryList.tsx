import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'
import ContractListWithOwner from './contract-with-owner/ContractListWithOwner'

const ContractHistoryList = () => {
    const [value, setValue] = useState<number>(0)
    const handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                height="100vh"
                width="100%"
            >
                <Box flexGrow={1}>
                    <StoreMenuComponent />
                </Box>
                <Box
                    flexGrow={10}
                    marginTop='0.5rem'
                    marginBottom='5%'
                >
                    <ContractListWithOwner />
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    )
}

export default ContractHistoryList