import React from 'react'

// Import Global Styles
import {
    PaddingContainer,
    FlexContainer,
} from '../../styles/Global.styled'

// Import Navbar Styles
import {
    NavMenuContainer,
    MenuIcon,
} from '../../styles/Navbar.styled'

import { AiOutlineClose } from 'react-icons/ai'

const NavMenu = ({ setOpenMenu }) => {
    return (
        <NavMenuContainer>
            {/* close-button */}
            <PaddingContainer left="5%" right="5%" top="2rem">
                <FlexContainer justify="flex-end">
                    <MenuIcon
                        onClick={() => { setOpenMenu(false) }}
                    >
                        <AiOutlineClose />
                    </MenuIcon>
                </FlexContainer>
            </PaddingContainer>

            {/* menu-items */}
        </NavMenuContainer>
    )
}

export default NavMenu