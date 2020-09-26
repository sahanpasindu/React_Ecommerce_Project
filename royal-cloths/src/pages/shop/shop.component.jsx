import React from 'react';

import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {
   constructor() {
      super();
      this.state = {
         collection: SHOP_DATA
      }
   }

   render() {
      const { collection } = this.state;
      return (
         <div className='shop-page'>
            {
               collection.map(({ id, ...otherCollectionProps }) => (
                  <CollectionPreview key={id} {...otherCollectionProps} />
               ))
            }
         </div>
      );
   }
}

export default ShopPage;