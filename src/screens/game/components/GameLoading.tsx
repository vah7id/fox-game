import React, { Fragment } from 'react';
import LoadingSpinner from '../../../assets/images/loading.gif';

const GameLoading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return (
        <Fragment>
            {isLoading && <img alt={'loading'} src={LoadingSpinner} />}
        </Fragment>
    );
};

export default GameLoading;