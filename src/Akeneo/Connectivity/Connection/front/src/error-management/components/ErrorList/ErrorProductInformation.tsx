import React, {FC} from 'react';
import styled from '../../../common/styled-with-theme';
import {Translate} from '../../../shared/translate';
import {Product} from '../../model/ConnectionError';

type Props = {
    product: Product;
};

const ErrorProductInformation: FC<Props> = ({product}) => {
    const productName =
        ' ' +
        ('number' === typeof product?.id && product.label === product.identifier
            ? '[' + product.label + ']'
            : product.label) +
        ' ';

    return (
        <ProductInformation>
            {'' === product?.label ? (
                <></>
            ) : '' !== product?.label && 'number' === typeof product?.id ? (
                <>
                    <Translate id='akeneo_connectivity.connection.error_management.connection_monitoring.error_list.content_column.product_name' />
                    <ProductName>{productName}</ProductName>
                    <Translate id='akeneo_connectivity.connection.error_management.connection_monitoring.error_list.content_column.with_id' />
                    <strong>{' ' + product.identifier}</strong>
                </>
            ) : (
                <>
                    <Translate id='akeneo_connectivity.connection.error_management.connection_monitoring.error_list.content_column.product_name' />
                    <ProductName>{productName}</ProductName>
                </>
            )}
        </ProductInformation>
    );
};

const ProductInformation = styled.div`
    padding-bottom: 10px;
    line-height: ${({theme}) => theme.fontSize.default};
`;

const ProductName = styled.span`
    color: ${({theme}) => theme.color.purple100};
    font-weight: bold;
    font-style: italic;
`;

export {ErrorProductInformation};
