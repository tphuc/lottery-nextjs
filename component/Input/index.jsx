import { blackA, violet, violetA, whiteA } from "@radix-ui/colors";
import { styled } from "@stitches/react";


const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: 4,
    padding: '0 10px',
    fontSize: 15,
    lineHeight: 1,
    width:"100%",
    boxSizing:"border-box",
    // color: violet.violet11,
   

    variants: {
        variant: {
            white: {
                boxShadow: `0 0 0 2px ${whiteA.whiteA8}`,
                background: whiteA.whiteA6,
                '&::placeholder': {
                    color: whiteA.whiteA10
                },
                height: 35,
                '&:focus': { boxShadow: `0 0 0 2px ${whiteA.whiteA10}` },
                '&:hover': { 
                    background: whiteA.whiteA8,
                },
            },
            black: {
                boxShadow: `0 0 0 2px ${blackA.blackA5}`,
                color: blackA.blackA12,
                background: blackA.blackA2,
                '&::placeholder': {
                    color: blackA.blackA10
                },
                height: 35,
                '&:focus': { boxShadow: `0 0 0 2px ${blackA.blackA12}` },
                '&:hover': { 
                    background: blackA.blackA3,
                },
            },
            violet: {
                boxShadow: `0 0 0 1px ${violetA.violetA7}`,
                color: violetA.violetA11,
                background: violetA.violetA2,
                '&::placeholder': {
                    color: violetA.violetA8
                },
                height: 35,
                '&:focus': { boxShadow: `0 0 0 2px ${violetA.violetA10}` },
                '&:hover': { 
                    background: violetA.violetA3,
                },
            }
        }
    },
    defaultVariants:{
        variant:"black"
    }
});


export {
    Input
}