/** @jsxImportSource @emotion/react */
import { variantPresetColors } from '@jdesignlab/theme';
import type { ColorToken, Color } from '@jdesignlab/theme';
import type { ButtonVariant, ButtonSize, ButtonProps } from './buttonTypes';
import { getColorByToken } from '@jdesignlab/theme';

// utils
// const getColorByToken = (color: ColorToken) => {
//     color = color || buttonDefaultColorToken;
//     const defaultVariant = 'base';
//     const baseColor = color.includes('-') ? color.split('-')[0] : color;
//     const colorVariant = color.includes('-') ? color.split('-')[1] : defaultVariant;
//     if (variantPresetColors[baseColor]) {
//         const parsedColor = variantPresetColors[baseColor][colorVariant];
//         return parsedColor;
//     }
// };

const buttonDefaultColorToken: ColorToken = 'teal-lighten4';
const whiteish = getColorByToken('red-lighten4');

const buttonSizeSet: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];

const buttonDefaultStyle = {
    backgroundColor: getColorByToken(buttonDefaultColorToken),
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

const buttonVariantStyle = (variant: ButtonVariant, color: ColorToken) => {
    const parsedColor = getColorByToken(color);
    const switchBackground = {
        background: 'none',
        color: parsedColor
    };

    switch (variant) {
        case 'outline':
            return {
                ...switchBackground,
                border: `solid ${parsedColor} 1px`,
                '&:hover': { background: parsedColor, color: whiteish }
            };
        case 'ghost':
            return {
                ...switchBackground,
                '&:hover': { background: parsedColor, color: whiteish }
            };
        case 'link':
            return {
                ...switchBackground,
                '&:hover': { color: parsedColor, textDecoration: 'underline' }
            };
        case 'unstyled':
            return {
                background: 'none'
            };
        default: // solid
            return {
                backgroundColor: parsedColor,
                color: whiteish
            };
    }
};

const buttonSizeStyle = (size: ButtonSize) => {
    const sizeIndex = buttonSizeSet.indexOf(size);
    return {
        height: `${(sizeIndex + 3) * 8}px`,
        fontSize: (sizeIndex + 6) * 2,
        padding: `0 ${(sizeIndex + 3) * 4}px`
    };
};

const Button = ({ children, variant, size, color }: ButtonProps) => {
    const buttonStyle = {
        ...buttonDefaultStyle,
        ...buttonVariantStyle(variant || 'solid', color || buttonDefaultColorToken),
        ...buttonSizeStyle(size ?? 'md')
    };
    return <button css={buttonStyle}>{children}</button>;
};

Button.displayName = 'Button';
Button.defaultProps = {
    variant: 'solid',
    size: 'md',
    children: 'button'
};

export default Button;
