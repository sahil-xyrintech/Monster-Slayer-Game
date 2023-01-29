// let getRandomValue = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// };
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      fireBulletRound: 0,
    };
  },
  computed: {
    monsterHealthBar() {
      if (this.monsterHealth < 60 && this.monsterHealth >= 20) {
        return { "bg-orange-400": this.monsterHealth };
      } else if (this.monsterHealth < 20) {
        return { "bg-red-600": this.monsterHealth };
      } else if (this.monsterHealth < 0) {
        return { "w-0": this.playerHealth };
      } else {
        return { "bg-green-500": this.monsterHealth };
      }
    },
    playerHealthBar() {
      if (this.playerHealth < 60 && this.playerHealth >= 20) {
        return { "bg-orange-400": this.playerHealth };
      } else if (this.playerHealth < 20) {
        return { "bg-red-600": this.playerHealth };
      } else if (this.playerHealth < 0) {
        return { "w-0": this.playerHealth };
      } else {
        return { "bg-green-500": this.playerHealth };
      }
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    attackMonster() {
      this.currentRound++;
      attackValue = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      attackValue = Math.floor(Math.random() * (15 - 8)) + 8;
      this.playerHealth -= attackValue;
    },
    specialAttack() {
      this.currentRound++;
      attackValue = Math.floor(Math.random() * (20 - 10)) + 10;
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = Math.floor(Math.random() * (20 - 8)) + 8;
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
  },
});
app.mount("#app");
