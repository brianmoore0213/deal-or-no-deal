import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../../components/display';
import { Button, Link } from '../../components/interactive';
import {
    clearRecord,
    getName,
    getRecord,
    resetEverything
} from '../../utils/api';
import { toDollar, toPct } from '../../utils/helpers';
import { Wrapper } from './style';

function History() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [playerRecord, setPlayerRecord] = useState(null);

    useEffect(() => {
        const name = getName();
        const record = getRecord();

        if (!name) {
            navigate('/');
        }

        setFirstName(name);
        setPlayerRecord(record);
        setIsLoading(false);
    }, [firstName, navigate, playerRecord]);

    const _clearRecord = () => {
        setIsLoading(true);
        clearRecord();
        setPlayerRecord(null);
    };

    if (isLoading) return <div> Loading... </div>;
    return (
        <Wrapper>
            <h1>History</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Wins</td>
                        <td>{playerRecord.wins}</td>
                    </tr>
                    <tr>
                        <td>Losses</td>
                        <td>{playerRecord.losses}</td>
                    </tr>
                    <tr>
                        <td>Win %</td>
                        <td>
                            {toPct(
                                playerRecord.wins /
                                    (playerRecord.wins + playerRecord.losses)
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Last Played</td>
                        <td>
                            {playerRecord.lastPlayed
                                ? new Date(
                                      playerRecord.lastPlayed
                                  ).toDateString()
                                : 'Never'}
                        </td>
                    </tr>
                    <tr>
                        <td>Highest Offer</td>
                        <td>{toDollar(playerRecord.highestOfferRecieved)}</td>
                    </tr>
                    <tr>
                        <td>Highest Accepted Offer</td>
                        <td>{toDollar(playerRecord.highestOfferAccepted)}</td>
                    </tr>
                    <tr>
                        <td>Highest Accepted Case</td>
                        <td>
                            {toDollar(playerRecord.highestCaseValueAccepted)}
                        </td>
                    </tr>
                </tbody>
            </table>
            <Actions>
                <Button onClick={_clearRecord}>Clear Record</Button>
                <Button onClick={resetEverything}>Clear All Data</Button>
                <Link to="/">Go Back</Link>
            </Actions>
        </Wrapper>
    );
}

export default History;
