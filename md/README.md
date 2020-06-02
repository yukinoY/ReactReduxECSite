今回の講座でメモしたこと

# Fluxフロー

## なぜReduxを使うのか
1. stateの見通しを良くする為
1. どこからでもstateを参照/変更可能にする為
1. モジュールを疎結合にする為<br>
　= 機能Aと機能Bが互いに影響し合わない

Reactのみだと、stateの管理や受け渡しが複雑になる<br>
（propsのバケツリレー）

## Store
Stateをまとめて管理している<br>
　= stateに変更があった時、その部分だけを直接書き換えられる

## Flux（フラックス）フローとは
1. データ設計の一つ
1. データが常に１方向に流れる
1. イベントによってデータが変化する（イベント駆動）

Flux思想をReactの状態管理に適用したライブラリ = **Redux**

## Reduxの登場人物
- コンポーネント
  - ユーザーが触れられる部分 例）`商品`

- コンテナー
  - Storeと接続されたコンポーネント 例）`お店`

- Action
  - 要求を受けて、状態の変更を依頼 例）`店員`

- Reducer
  - 変更を管理する 例）`在庫の管理者`

- Store
  - 状態を保存する 例）`倉庫`

- map...
  - 状態をコンテナーに渡す 例）`在庫を出してくる人

# Actions
## 役割
アプリからStoreへデータを送るためのpayload（データの塊）を渡す<br>
　→　アプリから受け取ったデータをReducersへ渡す

## なぜActionsを使うのか
**純粋にデータだけを記述するため**

「どのstateをどう変更するのか」<br>
　→ これをReducersに任せちゃう

## Actionsの書き方
```
export const SIGN_IN = “SIGN_IN”;

export const signInAction = userState => {
  return {
    type: SIGN_IN,
    payload: {
      inSignedIn: true,
      Id: userState.id,
      name: userState.name
    }
  }
}

1. Action typeを定義してexportする
2. typeとpayloadを記述する
3. プレーンなobjectを返す
```

# Reducers
## 役割
- Actionsからデータを受け取りStoreのstateをどう変更するのかを決める
**Store内のstate（状態）の管理人**

## initialStateを作ろう
```
const initialState = {
  users: {
    isSignedIn: false,
    id: “”,
    name: “”
  }
};

export default initialState

- Storeの初期状態
- アプリに必要なstateを全て記述
- exportする
```

## 書き方
```
import * as Actions from './actions'
import initialState from '../store/initialState'

export const UserReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

1. actionsファイル内のモジュールを全てimportする
　 （Actionsという名前をつける）
2. initialStateをimport
3. …はオブジェクトの中身を展開してくれる（2つ以上あればマージしてくれる）
4. オブジェクトは展開後、同じ要素があった場合は後に書いた方が採用される
```

# Store
## Storeの作り方
```
import {
  createStore as reduxCreateStore, // 便宜上名前を変えている
  combineReducers,
} from ‘redux’;

import {ProductsReducer} from '../products/reducers';
import {UsersReducer} from '../users/reducers';

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      products: ProductsReducer,
      users: UsersReducer,
    })
  );
}

1. reduxモジュールのimport
2. Reducersのimport
3. reduxのcreateStoreメソッドをreturn
4. combineReducersでstateを生成
```

## combineReducers()とは
```
combineReducers({
  products: ProductsReducer,
  users: UsersReducer,
})

⬇️

 {
  products: {

  },
  users: {
    isSignedIn: false,
    id: “”,
    name: “”
  }
};

1. 分割したReducersをまとめる
2. stateのカテゴリ毎
3. オブジェクトをreturnする（stateのデータ構造）
```

## StoreとReactアプリの接続
```
import React from ‘react’;
import ReactDOM from ‘react-dom'
import { Provider } from ‘react-redux’;
import createStore from ‘./reducks/store/store’;
import * as serviceWorker from ‘./serviceWorker’;
import App from ‘./App’;

export const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  Document.getElementById(‘root’),
}
serviceWorker.unregister();
```

## Providerとは
1. propsにstoreを渡す<br>
　→　ラップしたコンポーネントにstoreの情報を渡す
1. Reactコンポーネント内で<br>
　react-reduxのconnect関数を使えるようにする<br>
　　→　ReactとReduxを接続してstoreを変更できるように

# ルーティングの設定
## ルーティング用ライブラリ
1. React-router v4以降<br>
Reactのルーティング用ライブラリ

1. Connected-react-router<br>
ReduxのStoreでルーティングを管理<br>
React-router v4 & v5 と互換性あり

## middlewareの導入
```
Import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from ‘redux’;
import { connectRouter, routerMiddleware } from 'connected-react-router’;

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(
      routerMiddleware(history)
    )
  );
}
```

 ## StoreとRouterの接続
```
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root’),
)
serviceWorker.unregister();
```

## Routerコンポーネントを作る
```
import React from ‘react’;
import { Route, Switch } from ‘react-router’;
import { Login, Home } from ’./template’;

const Router = () => {
  return (
    <Switch>
      <Route exact path={“/login”} component={Login} />
      <Route exact path={“(/)?”} component={Home} />
    </Switch>
  );
};

export default Router;
```
exactとSwitchはセットで使う（URLが完全一致した場合にのみ表示されるようになる）<br>
Routeのみで使う場合は部分一致で判定される

(/)? = スラッシュはあってもなくてもいいよの意


## templateファイルの作成
Reactで言う親コンポーネントの役割。
ページ毎に作る
```
import React from 'react';
import {useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const Login = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(push('/'))}>
      </button>
    </div>
  );
};

export default Login;
```
Pushメソッドに遷移したいURLを渡すとそこに遷移できる
