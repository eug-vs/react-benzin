import React from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';


interface RenderPropTypes {
  index: number;
  style: React.CSSProperties;
}

interface PropTypes {
  itemSize: number;
  itemCount: number;
  renderItem: React.FC<RenderPropTypes>;
}

interface Size {
  height: number;
  width: number;
}


const SmartList: React.FC<PropTypes> = ({ itemSize, itemCount, renderItem }) => {
  const ResizedList: React.FC<Size> = ({ width, height }) => (
    <FixedSizeList
      height={height}
      width={width}
      itemSize={itemSize}
      itemCount={itemCount}
    >
      {renderItem}
    </FixedSizeList>
  );

  return (
    <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
      <AutoSizer children={ResizedList} />
    </div>
  );
};


export default SmartList;
