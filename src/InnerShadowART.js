/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ShadowARTType } from './types';
import { getPathWithRadius, transformShadowPropsForAndroid } from './helpers';
import Svg, { G, Path } from 'react-native-svg';


export default class InnerShadowART extends React.PureComponent {
  render() {
    const {
      width = 0,
      height = 0,
      borderRadius,
      shadowRadius,
      shadowOffset,
      shadowOpacity,
      shadowColor,
      backgroundColor,
    } = this.props;

    const shadowProps = transformShadowPropsForAndroid({
      shadowOpacity,
      shadowOffset,
      shadowRadius,
      shadowColor,
    });

    const absOffsetX = Math.abs(shadowOffset.x);
    const absOffsetY = Math.abs(shadowOffset.y);
    let stroke = 30;
    if (absOffsetX >= absOffsetY) {
      stroke += absOffsetX;
    } else {
      stroke += absOffsetY;
    }
    const path = getPathWithRadius(
      width + stroke + 2,
      height + stroke + 2,
      borderRadius + stroke / 2,
    );

    

    return (
      <Svg
      height={height}
      width={width}
      style={{ position: 'absolute' }}
    >
      <G x={-stroke / 2 - 1} y={-stroke / 2 - 1}>
        <Path
          d={path}
          strokeWidth={stroke}
          stroke={backgroundColor || 'white'}
          fill="none"
          {...shadowProps}
        />
      </G>
    </Svg>
    );
  }
}

InnerShadowART.propTypes = ShadowARTType;
