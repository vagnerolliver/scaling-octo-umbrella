import cx from 'classnames';
import { Component } from 'react';

export default class LikeDislike extends Component {

    state = {
        isDisliskeActive: false,
        isLikeActive: false,
        dislike: 25,
        like: 100,
    }
  
    isLikeActive() {
        return this.state.isLikeActive
    }

    isDisliskeActive() {
        return this.state.isDisliskeActive
    }

    setLike() {
        this.setState({
            isLikeActive: !this.isLikeActive(),
            like: this.isLikeActive()
                ? this.state.like - 1 
                : this.state.like + 1
        });
    }

    setDislike() {
        this.setState({
            isDisliskeActive: !this.isDisliskeActive(),
            dislike: this.isDisliskeActive() 
                ? this.state.dislike - 1 
                : this.state.dislike + 1
        });
    }

    handleLike() {
        if (this.isDisliskeActive()) {
            this.setDislike();
            this.setLike();
        }
        
        this.setLike()
    }

    handleDislike() {
        if (this.isLikeActive()){
            this.setDislike();
            this.setLike(); 
        }

        this.setDislike()
    }


    render() {
        return (
            <>
                <div>
                    <button 
                        className={cx('like-button', { ['liked']: this.state.isLikeActive })}
                        onClick={() => this.handleLike()}
                    >
                        Like | <span className="likes-counter">{this.state.like}</span>
                    </button>

                    <button 
                        className={cx('dislike-button', { ['disliked']: this.state.isDisliskeActive })}
                        onClick={() => this.handleDislike()}
                    >
                        Dislike | <span className="dislikes-counter">{this.state.dislike}</span>
                    </button>
                </div>
                <style>{`
                    .like-button, .dislike-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:   #585858;
                    }

                    .liked, .disliked {
                        font-weight: bold;
                        color: #1565c0;
                    }
                `}</style>
            </>
        );
    }
}
