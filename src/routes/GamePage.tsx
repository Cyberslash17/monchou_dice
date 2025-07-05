import { useEffect } from 'react';
import GameStart from './Game/StartGame';
import Game from './Game/Game';
import { useRecoilStateLoadable } from 'recoil';
import { activeGameAtom } from '../store/settingsState';

export default function GamePage() {
  const [isGameActive, _] = useRecoilStateLoadable(activeGameAtom);

  useEffect(() => {
    console.log('Loading game');
  });

  switch (isGameActive.state) {
    case 'hasValue':
      if (isGameActive.contents) return (<Game />);
      return (<GameStart />);
    case 'loading':
    default:
      return (<div>Loading...</div>);
  }
}