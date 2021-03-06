class GdqTimekeeperCoop extends Polymer.Element {
	static get is() {
		return 'gdq-timekeeper-coop';
	}

	static get properties() {
		return {
			results: {
				type: Object
			},
			runners: {
				type: Object
			}
		};
	}

	calcRunnerStatus(results) {
		if (results[0]) {
			return results[0].formatted;
		}

		return 'Running';
	}

	calcRunnerStatusClass(results) {
		if (results[0] && !results[0].forfeit) {
			return 'finished';
		}

		return '';
	}

	calcFinishHidden(results) {
		return results[0] && !results[0].forfeit;
	}

	calcResumeHidden(results) {
		return !results[0];
	}

	calcForfeitHidden(results) {
		return results[0] && results[0].forfeit;
	}

	calcEditDisabled(results) {
		return !results[0];
	}

	finish() {
		nodecg.sendMessage('completeRunner', {index: this.index, forfeit: false});
	}

	forfeit() {
		nodecg.sendMessage('completeRunner', {index: this.index, forfeit: true});
	}

	resume() {
		nodecg.sendMessage('resumeRunner', this.index);
	}

	editTime() {
		this.dispatchEvent(new CustomEvent(`edit-time`, {bubbles: true, composed: true}));
	}

	calcConcatenatedRunners(runners) {
		let concatenatedRunners = runners[0].name;
		if (runners.length > 1) {
			concatenatedRunners = runners.slice(1).reduce((prev, curr, index, array) => {
				if (!curr || !curr.name) {
					return prev;
				}

				if (index === array.length - 1) {
					return `${prev} & ${curr.name}`;
				}

				return `${prev}, ${curr.name}`;
			}, concatenatedRunners);
		}
		return concatenatedRunners;
	}
}

customElements.define(GdqTimekeeperCoop.is, GdqTimekeeperCoop);
