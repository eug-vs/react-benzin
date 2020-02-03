import React from 'react';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';


const SmartList = ({ itemSize, itemCount, renderItem }) => {

  return (
    <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={itemSize}
            itemCount={itemCount}
          >
            {renderItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};


export default SmartList;
