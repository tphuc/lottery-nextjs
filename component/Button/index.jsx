import { amber, blackA, purple, violet, whiteA, yellow, yellowDark, } from "@radix-ui/colors";
import { styled } from "@stitches/react";
import { Button as AriaButton } from "ariakit";

export const Button = styled(AriaButton, {
    boxSizing: "border-box",
    position: "relative",
    borderRadius: 8,

   
    padding: '5px 20px',
    transition: "0.2s ease all",
    display: 'inline-flex',
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    outline: "none",
    backgroundClip: "border-box",

    variants: {
        size: {
            sm: {
                height: 30,
            },
            md: {
                height: 34,
                fontSize:"smaller"
            },
            lg: {
                height: 38,
                fontSize:"medium"
            }
        },

        variant: {
            opaque: {
                background: whiteA.whiteA7,
                color: whiteA.whiteA12,
    
                // outline:"none",
                '&:hover': {
                    cursor: "pointer",
                    // background: `linear-gradient(180deg, ${amber.amber9}, ${amber.amber10})`,
                    background: whiteA.whiteA8,
                    color: "white"
                },
            },
            white: {
                background: whiteA.whiteA12,
                color: blackA.blackA12,

                // outline:"none",
                '&:hover': {
                    cursor: "pointer",
                    // background: `linear-gradient(180deg, ${amber.amber9}, ${amber.amber10})`,
                    background:  whiteA.whiteA12,
                    color: blackA.blackA12,
                },
            },
            violet: {
                background: violet.violet10,
                color: whiteA.whiteA12,

                // outline:"none",
                '&:hover': {
                    cursor: "pointer",
                    // background: `linear-gradient(180deg, ${amber.amber9}, ${amber.amber10})`,
                    background:  violet.violet9,
                    color: whiteA.whiteA12,
                },
            }
        }
        
    },

    defaultVariants: {
        variant:"opaque",
        size:"md"
    }

})