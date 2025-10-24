import { JSX } from "react";

export default function Instructions(): JSX.Element {
    return (
        <div>
            <p> 1. Choose the card type you prefer.</p>
            <p> 2. Click on the first card and then the second card you want to swap.</p>
            <p> 3. Check the hint and sound to see your progress.</p>
            <p> 4. Use revert button to go back.</p>
            <p> 5. Continue swaping the cards until you got all the 10 cards correct.</p>
        </div>
    );
}
