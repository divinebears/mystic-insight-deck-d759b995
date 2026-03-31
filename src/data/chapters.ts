export interface Interpretation {
  text: string;
  quality: 'correct' | 'partial' | 'wrong';
  points: number;
  explanation?: string;
}

export interface SceneQuestion {
  question: string;
  cardNames: string[]; // Names matching DECK entries
  cardMeanings: string[]; // Brief meaning for each card
  interpretations: Interpretation[];
}

export interface Scene {
  title: string;
  narrative: string;
  backgroundImage?: string; // URL or path for scene background
  questions: SceneQuestion[];
  isFinal?: boolean;
  finalOptions?: {
    text: string;
    isCorrect: boolean;
    ending: string;
  }[];
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  premise: string;
  badge: string;
  badgeEmoji: string;
  scenes: Scene[];
}

export const CHAPTERS: Chapter[] = [
  // ===== CHAPTER 1: The Murder at Moonlight Manor =====
  {
    id: 1,
    title: 'The Murder at Moonlight Manor',
    subtitle: 'A locked-room mystery at a lavish party.',
    premise: 'Lord Alistair Halvard was found dead inside his locked study. No weapon. No wounds. Three suspects: Lady Celeste (his wife), Victor (his nephew), and Dr. Rowan Bell (the family physician).',
    badge: 'Manor Sleuth',
    badgeEmoji: '🗡️',
    scenes: [
      // Scene 1: Arrival
      {
        title: 'Arrival at Moonlight Manor',
        narrative: 'Rain falls softly as your carriage arrives. Inside the manor, servants whisper. The body remains in the locked study. The suspects wait in separate rooms. You shuffle the Lenormand deck.',
        backgroundImage: '', // Add your scene background image URL here
        questions: [
          {
            question: 'Who among the suspects hides the darkest intention?',
            cardNames: ['Fox', 'Snake', 'Gentleman'],
            cardMeanings: ['deceit, cunning', 'betrayal, manipulation', 'a man involved'],
            interpretations: [
              { text: 'A man acting deceptively betrayed Lord Halvard.', quality: 'correct', points: 10 },
              { text: 'The wife secretly arranged the murder.', quality: 'wrong', points: 0, explanation: 'The Gentleman strongly indicates a male suspect, not Lady Celeste.' },
              { text: 'Someone close to the family manipulated events.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'What truly caused Lord Halvard\'s death?',
            cardNames: ['Scythe', 'Fish', 'Heart'],
            cardMeanings: ['sudden harm', 'liquids', 'drink or celebration'],
            interpretations: [
              { text: 'The victim was poisoned through a drink.', quality: 'correct', points: 10 },
              { text: 'The victim was stabbed suddenly.', quality: 'wrong', points: 0, explanation: 'The Fish and Cup indicate liquid ingestion, not a physical weapon.' },
              { text: 'The victim became ill during the party.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Where should I begin the investigation?',
            cardNames: ['House', 'Book', 'Key'],
            cardMeanings: ['the manor itself', 'hidden information', 'discovery'],
            interpretations: [
              { text: 'Important secrets are hidden somewhere inside the manor.', quality: 'correct', points: 10 },
              { text: 'The answer lies outside the estate.', quality: 'wrong', points: 0 },
              { text: 'Someone will confess if questioned directly.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 2: The Locked Study
      {
        title: 'The Locked Study',
        narrative: 'You enter the study where Lord Halvard died. A glass sits on the desk. No wounds. No struggle. The room smells faintly bitter. You consult the cards again.',
        backgroundImage: '',
        questions: [
          {
            question: 'What clue inside this room matters most?',
            cardNames: ['Heart', 'Snake', 'Scythe'],
            cardMeanings: ['drink or celebration', 'betrayal', 'sudden harm'],
            interpretations: [
              { text: 'Something harmful was hidden in the victim\'s drink.', quality: 'correct', points: 10 },
              { text: 'The victim cut himself with something sharp.', quality: 'wrong', points: 0 },
              { text: 'The victim argued with someone during a drink.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Was the locked room staged?',
            cardNames: ['Fox', 'Key', 'Crossroads'],
            cardMeanings: ['deception', 'solution', 'choices'],
            interpretations: [
              { text: 'The locked room was deliberately staged to mislead investigators.', quality: 'correct', points: 10 },
              { text: 'The room locked automatically.', quality: 'wrong', points: 0 },
              { text: 'Someone locked the door later.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Did the killer enter this room?',
            cardNames: ['Birds', 'Gentleman', 'Fox'],
            cardMeanings: ['conversation', 'a man', 'cunning'],
            interpretations: [
              { text: 'A man spoke with the victim shortly before the death.', quality: 'correct', points: 10 },
              { text: 'Several people entered the room.', quality: 'wrong', points: 0 },
              { text: 'Someone watched from outside the room.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 3: Lady Celeste
      {
        title: 'Interview with Lady Celeste',
        narrative: 'Lady Celeste greets you calmly. She claims she last saw her husband during dinner. Her eyes betray exhaustion… or fear.',
        backgroundImage: '',
        questions: [
          {
            question: 'Is Lady Celeste telling the truth?',
            cardNames: ['Heart', 'Moon', 'Book'],
            cardMeanings: ['emotion', 'intuition', 'hidden knowledge'],
            interpretations: [
              { text: 'She hides emotional pain but is not the killer.', quality: 'correct', points: 10 },
              { text: 'She secretly murdered her husband.', quality: 'wrong', points: 0 },
              { text: 'She knows more than she is saying.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Did she benefit from the death?',
            cardNames: ['Fish', 'Ring', 'Coffin'],
            cardMeanings: ['finances', 'commitment', 'ending'],
            interpretations: [
              { text: 'She gains wealth after his death.', quality: 'correct', points: 10 },
              { text: 'She loses everything financially.', quality: 'wrong', points: 0 },
              { text: 'The inheritance will cause family disputes.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Does she suspect someone else?',
            cardNames: ['Birds', 'Gentleman', 'Whip'],
            cardMeanings: ['gossip', 'a man', 'conflict'],
            interpretations: [
              { text: 'She recently witnessed an argument between two men.', quality: 'correct', points: 10 },
              { text: 'She suspects a servant.', quality: 'wrong', points: 0 },
              { text: 'She overheard gossip during the party.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 4: Victor
      {
        title: 'The Nephew Victor',
        narrative: 'Victor looks nervous. His hands tremble slightly. He insists he loved his uncle.',
        backgroundImage: '',
        questions: [
          {
            question: 'Is Victor hiding something?',
            cardNames: ['Fox', 'Fish', 'Gentleman'],
            cardMeanings: ['deception', 'finances', 'a man'],
            interpretations: [
              { text: 'Victor hides financial deception.', quality: 'correct', points: 10 },
              { text: 'Victor is innocent and honest.', quality: 'wrong', points: 0 },
              { text: 'Victor made bad business decisions.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'What connects Victor to the crime?',
            cardNames: ['Snake', 'Heart', 'Scythe'],
            cardMeanings: ['betrayal', 'drink', 'sudden harm'],
            interpretations: [
              { text: 'Victor had access to the poisoned drink.', quality: 'correct', points: 10 },
              { text: 'Victor physically attacked the victim.', quality: 'wrong', points: 0 },
              { text: 'Victor knew about a dangerous substance.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Was Victor desperate for money?',
            cardNames: ['Fish', 'Whip', 'Coffin'],
            cardMeanings: ['finances', 'conflict', 'ending'],
            interpretations: [
              { text: 'Debts and financial pressure pushed Victor toward drastic action.', quality: 'correct', points: 10 },
              { text: 'Victor recently became wealthy.', quality: 'wrong', points: 0 },
              { text: 'Victor had financial stress.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 5: Dr Rowan
      {
        title: 'Dr Rowan Bell',
        narrative: 'The physician seems calm. Too calm.',
        backgroundImage: '',
        questions: [
          {
            question: 'Did Dr Rowan poison the victim?',
            cardNames: ['Tree', 'Book', 'Gentleman'],
            cardMeanings: ['health', 'secret knowledge', 'a man'],
            interpretations: [
              { text: 'He understands poisons but did not administer them.', quality: 'correct', points: 10 },
              { text: 'He personally poisoned the victim.', quality: 'wrong', points: 0 },
              { text: 'He knows medical secrets.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'What was his argument with Lord Halvard about?',
            cardNames: ['Whip', 'Fish', 'Ring'],
            cardMeanings: ['conflict', 'finances', 'contract'],
            interpretations: [
              { text: 'They argued about financial matters.', quality: 'correct', points: 10 },
              { text: 'They fought physically.', quality: 'wrong', points: 0 },
              { text: 'They argued about family issues.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Does he know how the victim died?',
            cardNames: ['Book', 'Moon', 'Coffin'],
            cardMeanings: ['secret', 'intuition', 'death'],
            interpretations: [
              { text: 'He suspects poison but lacks proof.', quality: 'correct', points: 10 },
              { text: 'He has no idea what happened.', quality: 'wrong', points: 0 },
              { text: 'He senses something is wrong.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 6: The Wine Table
      {
        title: 'The Wine Table',
        narrative: 'You examine the drinks served at the party.',
        backgroundImage: '',
        questions: [
          {
            question: 'Was poison placed in the wine?',
            cardNames: ['Fish', 'Snake', 'Heart'],
            cardMeanings: ['liquid', 'betrayal', 'drink'],
            interpretations: [
              { text: 'Poison was hidden in the drink.', quality: 'correct', points: 10 },
              { text: 'The wine was harmless.', quality: 'wrong', points: 0 },
              { text: 'The drink was tampered with.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Who handled the victim\'s glass?',
            cardNames: ['Gentleman', 'Fox', 'Heart'],
            cardMeanings: ['a man', 'deception', 'drink'],
            interpretations: [
              { text: 'A deceptive man handled the drink.', quality: 'correct', points: 10 },
              { text: 'A servant delivered it.', quality: 'wrong', points: 0 },
              { text: 'Someone briefly moved the glass.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Did the poison act quickly?',
            cardNames: ['Scythe', 'Coffin', 'Fish'],
            cardMeanings: ['sudden', 'death', 'liquid'],
            interpretations: [
              { text: 'The poison acted suddenly after drinking.', quality: 'correct', points: 10 },
              { text: 'The poison was slow acting.', quality: 'wrong', points: 0 },
              { text: 'The victim became ill shortly after.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 7: Financial Records
      {
        title: 'Financial Records',
        narrative: 'You inspect Lord Halvard\'s ledgers.',
        backgroundImage: '',
        questions: [
          {
            question: 'Who owed the victim money?',
            cardNames: ['Fish', 'Gentleman', 'Coffin'],
            cardMeanings: ['finances', 'a man', 'ending'],
            interpretations: [
              { text: 'Victor owed a large debt.', quality: 'correct', points: 10 },
              { text: 'Lady Celeste owed the money.', quality: 'wrong', points: 0 },
              { text: 'A family member owed money.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Was someone being cut out of inheritance?',
            cardNames: ['Ring', 'Scythe', 'Gentleman'],
            cardMeanings: ['contract', 'severance', 'a man'],
            interpretations: [
              { text: 'Lord Halvard planned to cut Victor out of the will.', quality: 'correct', points: 10 },
              { text: 'He planned to give Victor money.', quality: 'wrong', points: 0 },
              { text: 'He planned to change inheritance.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Was there financial blackmail?',
            cardNames: ['Snake', 'Book', 'Fish'],
            cardMeanings: ['betrayal', 'secret', 'money'],
            interpretations: [
              { text: 'Someone used financial secrets as leverage.', quality: 'correct', points: 10 },
              { text: 'No financial manipulation occurred.', quality: 'wrong', points: 0 },
              { text: 'There were hidden debts.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 8: Reconstructing the Night
      {
        title: 'Reconstructing the Night',
        narrative: 'You piece together the events of the fateful evening.',
        backgroundImage: '',
        questions: [
          {
            question: 'Who spoke to the victim last?',
            cardNames: ['Birds', 'Gentleman', 'Heart'],
            cardMeanings: ['conversation', 'a man', 'drink'],
            interpretations: [
              { text: 'Victor spoke with him over drinks.', quality: 'correct', points: 10 },
              { text: 'Lady Celeste was last.', quality: 'wrong', points: 0 },
              { text: 'Two men spoke with him.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'When was the poison given?',
            cardNames: ['Heart', 'Snake', 'Scythe'],
            cardMeanings: ['drink', 'betrayal', 'sudden'],
            interpretations: [
              { text: 'Poison added shortly before drinking.', quality: 'correct', points: 10 },
              { text: 'Poison added after death.', quality: 'wrong', points: 0 },
              { text: 'Drink tampered with earlier.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Was the murder premeditated?',
            cardNames: ['Fox', 'Book', 'Scythe'],
            cardMeanings: ['cunning', 'planning', 'decisive action'],
            interpretations: [
              { text: 'Victor carefully planned the murder.', quality: 'correct', points: 10 },
              { text: 'The murder was spontaneous.', quality: 'wrong', points: 0 },
              { text: 'Victor considered harming him earlier.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 9: The Accusation
      {
        title: 'The Accusation',
        narrative: 'You gather the suspects.',
        backgroundImage: '',
        questions: [
          {
            question: 'Who killed Lord Halvard?',
            cardNames: ['Fox', 'Gentleman', 'Coffin'],
            cardMeanings: ['deception', 'a man', 'death'],
            interpretations: [
              { text: 'Victor Halvard murdered him.', quality: 'correct', points: 10 },
              { text: 'Lady Celeste killed him.', quality: 'wrong', points: 0 },
              { text: 'A man in the family killed him.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'What was the motive?',
            cardNames: ['Fish', 'Whip', 'Coffin'],
            cardMeanings: ['money', 'conflict', 'ending'],
            interpretations: [
              { text: 'Debt and financial ruin drove the murder.', quality: 'correct', points: 10 },
              { text: 'Love or jealousy caused it.', quality: 'wrong', points: 0 },
              { text: 'Family conflict caused the murder.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'How was the crime concealed?',
            cardNames: ['Fox', 'Crossroads', 'Key'],
            cardMeanings: ['deception', 'options', 'solution'],
            interpretations: [
              { text: 'The locked room was staged afterward.', quality: 'correct', points: 10 },
              { text: 'The room locked automatically.', quality: 'wrong', points: 0 },
              { text: 'Someone locked the door later.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      // Scene 10: Final Deduction
      {
        title: 'Final Deduction',
        narrative: 'The cards will now reveal the truth.',
        backgroundImage: '',
        isFinal: true,
        questions: [
          {
            question: 'What truly happened?',
            cardNames: ['Fox', 'Gentleman', 'Fish', 'Heart', 'Coffin'],
            cardMeanings: ['deception', 'male suspect', 'money', 'drink', 'death'],
            interpretations: [
              { text: 'Victor poisoned his uncle\'s drink due to debt, then staged the locked room.', quality: 'correct', points: 20 },
              { text: 'Victor argued with his uncle during drinks, which led to a sudden accidental death.', quality: 'partial', points: 10 },
              { text: 'Dr. Rowan Bell administered a lethal dose during a medical examination.', quality: 'wrong', points: 0 },
            ]
          }
        ],
        finalOptions: [
          { text: 'Victor poisoned his uncle\'s drink due to debt, then staged the locked room.', isCorrect: true, ending: 'Victor confesses after seeing the cards reveal the truth. Justice is served at Moonlight Manor.' },
          { text: 'Victor argued with his uncle during drinks, leading to accidental death.', isCorrect: false, ending: 'Victor escapes suspicion, but doubt remains. The case goes cold.' },
          { text: 'Dr. Rowan Bell administered a lethal dose during examination.', isCorrect: false, ending: 'The wrong suspect is accused. Justice fails.' },
        ]
      }
    ]
  },

  // ===== CHAPTER 2: The Vanishing Opera Diva =====
  {
    id: 2,
    title: 'The Vanishing Opera Diva',
    subtitle: 'A star soprano vanishes during intermission.',
    premise: 'During the premiere at the Grand Aurora Opera House, soprano Isabella Virelli vanished. Her dressing room was locked, costume remained. On the floor — a single black feather.',
    badge: 'Opera Phantom',
    badgeEmoji: '🎭',
    scenes: [
      {
        title: 'Arrival at the Opera House',
        narrative: 'Music echoes through the empty hall. Performers whisper nervously backstage. The director greets you urgently. "Please… find Isabella."',
        backgroundImage: '',
        questions: [
          {
            question: 'What happened to Isabella?',
            cardNames: ['Birds', 'Crossroads', 'Fox'],
            cardMeanings: ['performers, conversation', 'choices, departure', 'trickery, deception'],
            interpretations: [
              { text: 'Isabella secretly chose to leave through a deceptive plan.', quality: 'correct', points: 10 },
              { text: 'She was abducted suddenly during the performance.', quality: 'wrong', points: 0 },
              { text: 'Someone pressured her into leaving.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Who may be involved in her disappearance?',
            cardNames: ['Gentleman', 'Moon', 'Fox'],
            cardMeanings: ['a man', 'fame, performers', 'cunning deception'],
            interpretations: [
              { text: 'A man connected to her career is involved in the mystery.', quality: 'correct', points: 10 },
              { text: 'A female rival sabotaged her performance.', quality: 'wrong', points: 0 },
              { text: 'Someone backstage manipulated events.', quality: 'partial', points: 5 },
            ]
          },
          {
            question: 'Where should I investigate first?',
            cardNames: ['Tower', 'Book', 'Key'],
            cardMeanings: ['large building', 'hidden information', 'discovery'],
            interpretations: [
              { text: 'Important secrets are hidden somewhere inside the opera house.', quality: 'correct', points: 10 },
              { text: 'The mystery lies outside the theater.', quality: 'wrong', points: 0 },
              { text: 'A witness will confess the truth soon.', quality: 'partial', points: 5 },
            ]
          }
        ]
      },
      {
        title: 'The Empty Dressing Room',
        narrative: 'You enter Isabella\'s dressing room. Her elaborate costume hangs neatly. Her jewelry box is untouched. But the window is sealed shut. The feather remains on the floor.',
        backgroundImage: '',
        questions: [
          { question: 'What clue here matters most?', cardNames: ['Birds', 'Fox', 'Book'], cardMeanings: ['performers', 'deception', 'secret'], interpretations: [
            { text: 'The feather is a deliberate clue connected to performance or disguise.', quality: 'correct', points: 10 },
            { text: 'The feather fell from her costume accidentally.', quality: 'wrong', points: 0 },
            { text: 'The feather belongs to someone who visited her room.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did Isabella leave voluntarily?', cardNames: ['Crossroads', 'Lady', 'Fox'], cardMeanings: ['choices', 'a woman', 'deception'], interpretations: [
            { text: 'Isabella chose to disappear through a secret plan.', quality: 'correct', points: 10 },
            { text: 'She was forcibly taken.', quality: 'wrong', points: 0 },
            { text: 'Isabella left but someone pressured her.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did someone help her leave?', cardNames: ['Gentleman', 'Birds', 'Fox'], cardMeanings: ['a man', 'communication', 'cunning'], interpretations: [
            { text: 'A man connected to the stage helped her.', quality: 'correct', points: 10 },
            { text: 'The audience helped her escape.', quality: 'wrong', points: 0 },
            { text: 'Someone backstage knew of the plan.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Rival Singer',
        narrative: 'Elena Duarte waits backstage. She was replaced by Isabella in the lead role. Her resentment is obvious.',
        backgroundImage: '',
        questions: [
          { question: 'Did Elena harm Isabella?', cardNames: ['Snake', 'Moon', 'Lady'], cardMeanings: ['betrayal', 'fame', 'a woman'], interpretations: [
            { text: 'Elena envied Isabella but did not cause the disappearance.', quality: 'correct', points: 10 },
            { text: 'Elena murdered Isabella.', quality: 'wrong', points: 0 },
            { text: 'Their rivalry caused tension.', quality: 'partial', points: 5 },
          ]},
          { question: 'What was Elena\'s relationship with Isabella?', cardNames: ['Snake', 'Whip', 'Moon'], cardMeanings: ['rivalry', 'conflict', 'fame'], interpretations: [
            { text: 'They competed fiercely for fame.', quality: 'correct', points: 10 },
            { text: 'They were close friends.', quality: 'wrong', points: 0 },
            { text: 'They often argued.', quality: 'partial', points: 5 },
          ]},
          { question: 'Does Elena know where Isabella went?', cardNames: ['Book', 'Lady', 'Crossroads'], cardMeanings: ['secret', 'a woman', 'choices'], interpretations: [
            { text: 'Elena suspects Isabella planned to leave.', quality: 'correct', points: 10 },
            { text: 'Elena secretly hid Isabella.', quality: 'wrong', points: 0 },
            { text: 'Elena heard rumors Isabella might quit.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Composer',
        narrative: 'Marco Bellini composed the opera. He adored Isabella. Almost obsessively.',
        backgroundImage: '',
        questions: [
          { question: 'Did Marco help Isabella escape?', cardNames: ['Gentleman', 'Key', 'Birds'], cardMeanings: ['a man', 'solution', 'communication'], interpretations: [
            { text: 'Marco knows something important but did not help her escape.', quality: 'correct', points: 10 },
            { text: 'Marco engineered the disappearance.', quality: 'wrong', points: 0 },
            { text: 'Marco witnessed something unusual.', quality: 'partial', points: 5 },
          ]},
          { question: 'What secret did Marco know?', cardNames: ['Book', 'Ring', 'Fox'], cardMeanings: ['secret', 'contract', 'deception'], interpretations: [
            { text: 'Marco knew Isabella was pressured into a contract.', quality: 'correct', points: 10 },
            { text: 'Marco was planning to marry her.', quality: 'wrong', points: 0 },
            { text: 'Marco knew she had secret negotiations.', quality: 'partial', points: 5 },
          ]},
          { question: 'Was Marco romantically involved?', cardNames: ['Heart', 'Moon', 'Gentleman'], cardMeanings: ['love', 'emotion', 'a man'], interpretations: [
            { text: 'Marco loved Isabella but she did not return the feeling.', quality: 'correct', points: 10 },
            { text: 'They were secretly engaged.', quality: 'wrong', points: 0 },
            { text: 'He admired her deeply.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Wealthy Patron',
        narrative: 'Adrian Volkov sits in the opera\'s private box. His interest in Isabella was well known.',
        backgroundImage: '',
        questions: [
          { question: 'Did Volkov kidnap Isabella?', cardNames: ['Fox', 'Gentleman', 'Tower'], cardMeanings: ['cunning', 'a man', 'institution'], interpretations: [
            { text: 'Volkov manipulated her career but did not kidnap her.', quality: 'correct', points: 10 },
            { text: 'Volkov abducted her.', quality: 'wrong', points: 0 },
            { text: 'Volkov pressured her.', quality: 'partial', points: 5 },
          ]},
          { question: 'What did Volkov want from her?', cardNames: ['Ring', 'Moon', 'Fox'], cardMeanings: ['contract', 'fame', 'cunning'], interpretations: [
            { text: 'He wanted her bound to an exclusive contract.', quality: 'correct', points: 10 },
            { text: 'He wanted to marry her.', quality: 'wrong', points: 0 },
            { text: 'He wanted her performances exclusively.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did Isabella fear him?', cardNames: ['Lady', 'Fox', 'Crossroads'], cardMeanings: ['a woman', 'deception', 'choices'], interpretations: [
            { text: 'Isabella planned to escape his influence.', quality: 'correct', points: 10 },
            { text: 'She secretly loved him.', quality: 'wrong', points: 0 },
            { text: 'She avoided him.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'Stage Machinery',
        narrative: 'Behind the stage you discover strange mechanisms. Trapdoors. Pulley systems. Hidden passages.',
        backgroundImage: '',
        questions: [
          { question: 'Did Isabella use the stage mechanisms?', cardNames: ['Tower', 'Key', 'Crossroads'], cardMeanings: ['building', 'discovery', 'paths'], interpretations: [
            { text: 'A hidden passage in the theater allowed her escape.', quality: 'correct', points: 10 },
            { text: 'There is no secret exit.', quality: 'wrong', points: 0 },
            { text: 'A secret door exists.', quality: 'partial', points: 5 },
          ]},
          { question: 'Was someone skilled involved?', cardNames: ['Gentleman', 'Fox', 'Scythe'], cardMeanings: ['a man', 'cunning', 'tools'], interpretations: [
            { text: 'A stage technician helped prepare the escape.', quality: 'correct', points: 10 },
            { text: 'The mechanism activated automatically.', quality: 'wrong', points: 0 },
            { text: 'Someone backstage assisted unknowingly.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did she escape during the performance?', cardNames: ['Birds', 'Moon', 'Crossroads'], cardMeanings: ['performers', 'fame', 'departure'], interpretations: [
            { text: 'She slipped away during the performance chaos.', quality: 'correct', points: 10 },
            { text: 'She escaped before the show.', quality: 'wrong', points: 0 },
            { text: 'She left during intermission.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'Hidden Contract',
        narrative: 'In Marco\'s office you find documents. One contract stands out.',
        backgroundImage: '',
        questions: [
          { question: 'Was Isabella being controlled legally?', cardNames: ['Ring', 'Fox', 'Book'], cardMeanings: ['contract', 'deception', 'secret'], interpretations: [
            { text: 'The contract would trap her career under Volkov.', quality: 'correct', points: 10 },
            { text: 'The contract gave her freedom.', quality: 'wrong', points: 0 },
            { text: 'The contract was unfair.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did she intend to flee the opera house?', cardNames: ['Crossroads', 'Lady', 'Key'], cardMeanings: ['choices', 'a woman', 'solution'], interpretations: [
            { text: 'She planned her escape carefully.', quality: 'correct', points: 10 },
            { text: 'She planned to confront Volkov.', quality: 'wrong', points: 0 },
            { text: 'She considered leaving.', quality: 'partial', points: 5 },
          ]},
          { question: 'Was someone exploiting her fame?', cardNames: ['Moon', 'Fish', 'Fox'], cardMeanings: ['fame', 'money', 'cunning'], interpretations: [
            { text: 'Her fame was being used for profit.', quality: 'correct', points: 10 },
            { text: 'Her fame was declining.', quality: 'wrong', points: 0 },
            { text: 'Her career involved money disputes.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'Witness Testimony',
        narrative: 'A stagehand reveals something strange. He saw someone disguised leaving backstage.',
        backgroundImage: '',
        questions: [
          { question: 'Was Isabella disguised?', cardNames: ['Fox', 'Lady', 'Book'], cardMeanings: ['deception', 'a woman', 'secret'], interpretations: [
            { text: 'Isabella left disguised as someone else.', quality: 'correct', points: 10 },
            { text: 'She left openly.', quality: 'wrong', points: 0 },
            { text: 'She wore a cloak.', quality: 'partial', points: 5 },
          ]},
          { question: 'Where did she go after leaving?', cardNames: ['Crossroads', 'Ship', 'Lady'], cardMeanings: ['departure', 'journey', 'a woman'], interpretations: [
            { text: 'She fled the city.', quality: 'correct', points: 10 },
            { text: 'She hid inside the theater.', quality: 'wrong', points: 0 },
            { text: 'She left the opera house.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did anyone pursue her?', cardNames: ['Birds', 'Gentleman', 'Tower'], cardMeanings: ['communication', 'a man', 'institution'], interpretations: [
            { text: 'Volkov\'s agents searched for her afterward.', quality: 'correct', points: 10 },
            { text: 'No one looked for her.', quality: 'wrong', points: 0 },
            { text: 'Some staff noticed her leaving.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'Reconstructing the Escape',
        narrative: 'You now understand the plan. But the truth must be proven.',
        backgroundImage: '',
        questions: [
          { question: 'Who helped Isabella escape?', cardNames: ['Fox', 'Gentleman', 'Tower'], cardMeanings: ['deception', 'a man', 'building'], interpretations: [
            { text: 'A stage technician secretly assisted her.', quality: 'correct', points: 10 },
            { text: 'The rival singer helped.', quality: 'wrong', points: 0 },
            { text: 'Someone backstage helped.', quality: 'partial', points: 5 },
          ]},
          { question: 'What was the motive for the disappearance?', cardNames: ['Ring', 'Fox', 'Crossroads'], cardMeanings: ['contract', 'deception', 'choices'], interpretations: [
            { text: 'She escaped to avoid the binding contract.', quality: 'correct', points: 10 },
            { text: 'She disappeared for publicity.', quality: 'wrong', points: 0 },
            { text: 'She wanted freedom.', quality: 'partial', points: 5 },
          ]},
          { question: 'Was the feather a clue?', cardNames: ['Birds', 'Fox', 'Book'], cardMeanings: ['performers', 'disguise', 'secret'], interpretations: [
            { text: 'The feather symbolized stage disguise.', quality: 'correct', points: 10 },
            { text: 'It was planted by the rival.', quality: 'wrong', points: 0 },
            { text: 'It belonged to a costume.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'Final Deduction',
        narrative: 'The truth of Isabella\'s disappearance must now be revealed.',
        backgroundImage: '',
        isFinal: true,
        questions: [
          {
            question: 'What truly happened to Isabella?',
            cardNames: ['Lady', 'Crossroads', 'Fox', 'Ring', 'Ship'],
            cardMeanings: ['Isabella', 'decision', 'deception/disguise', 'binding contract', 'escape'],
            interpretations: [
              { text: 'Isabella disguised herself and escaped the opera to avoid being trapped by Volkov\'s contract.', quality: 'correct', points: 20 },
              { text: 'Isabella was kidnapped by Volkov\'s agents during the performance.', quality: 'wrong', points: 0 },
              { text: 'Isabella left voluntarily but without a clear plan.', quality: 'partial', points: 10 },
            ]
          }
        ],
        finalOptions: [
          { text: 'Isabella disguised herself and escaped to avoid Volkov\'s contract.', isCorrect: true, ending: 'You reveal Isabella staged the disappearance to reclaim her freedom. The truth sets her free.' },
          { text: 'Isabella was kidnapped by Volkov\'s agents.', isCorrect: false, ending: 'The patron is falsely accused and Isabella remains missing.' },
          { text: 'Isabella left without a plan, confused and lost.', isCorrect: false, ending: 'Her escape is suspected but not fully proven.' },
        ]
      }
    ]
  },

  // ===== CHAPTER 3: The Curse of Blackthorn Cemetery =====
  {
    id: 3,
    title: 'The Curse of Blackthorn Cemetery',
    subtitle: 'Strange lights and opened graves terrorize a town.',
    premise: 'At the edge of town stands Blackthorn Cemetery. Strange lights drift among the graves. Newly disturbed graves appear. Yet no body is missing. The truth: Lydia Harrow created ghost lights to hide her search for hidden treasure beneath an ancient crypt.',
    badge: 'Graveyard Guardian',
    badgeEmoji: '⚰️',
    scenes: [
      {
        title: 'Arrival at Blackthorn Cemetery',
        narrative: 'Fog coils around crooked gravestones. The old iron gate creaks behind you. A frightened caretaker whispers: "Something walks here at night."',
        backgroundImage: '',
        questions: [
          { question: 'Is the cemetery truly cursed?', cardNames: ['Spirit', 'Clouds', 'Fox'], cardMeanings: ['unseen forces', 'confusion', 'deception'], interpretations: [
            { text: 'The haunting is mostly deception creating fear.', quality: 'correct', points: 10 },
            { text: 'Powerful spirits are attacking the town.', quality: 'wrong', points: 0 },
            { text: 'Some spiritual energy is present but misunderstood.', quality: 'partial', points: 5 },
          ]},
          { question: 'What is causing the strange lights?', cardNames: ['Stars', 'Fox', 'Garden'], cardMeanings: ['lights in darkness', 'trickery', 'public space'], interpretations: [
            { text: 'Artificial lights are being used to deceive people.', quality: 'correct', points: 10 },
            { text: 'Ghost spirits are appearing publicly.', quality: 'wrong', points: 0 },
            { text: 'Natural lights appear due to weather.', quality: 'partial', points: 5 },
          ]},
          { question: 'Where should I investigate first?', cardNames: ['Tower', 'Coffin', 'Book'], cardMeanings: ['institution', 'grave', 'hidden knowledge'], interpretations: [
            { text: 'The cemetery records and graves hide important clues.', quality: 'correct', points: 10 },
            { text: 'The town hall contains the answer.', quality: 'wrong', points: 0 },
            { text: 'The caretaker knows everything.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Disturbed Grave',
        narrative: 'A grave near the chapel has been freshly dug. Yet the coffin remains intact.',
        backgroundImage: '',
        questions: [
          { question: 'Why was the grave opened?', cardNames: ['Mice', 'Coffin', 'Book'], cardMeanings: ['hidden problem', 'grave', 'secret'], interpretations: [
            { text: 'Someone secretly searched the grave for something hidden.', quality: 'correct', points: 10 },
            { text: 'The grave collapsed naturally.', quality: 'wrong', points: 0 },
            { text: 'Someone vandalized the grave randomly.', quality: 'partial', points: 5 },
          ]},
          { question: 'Was someone searching for something?', cardNames: ['Key', 'Coffin', 'Book'], cardMeanings: ['discovery', 'grave', 'secret'], interpretations: [
            { text: 'Someone believes something important is hidden within the cemetery graves.', quality: 'correct', points: 10 },
            { text: 'The coffin itself is valuable.', quality: 'wrong', points: 0 },
            { text: 'The grave contains important historical information.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did supernatural forces cause this?', cardNames: ['Spirit', 'Clouds', 'Coffin'], cardMeanings: ['supernatural', 'confusion', 'grave'], interpretations: [
            { text: 'People believe spirits caused it, but the truth is unclear.', quality: 'correct', points: 10 },
            { text: 'A ghost physically opened the grave.', quality: 'wrong', points: 0 },
            { text: 'The grave disturbance created fear of spirits.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Cemetery Caretaker',
        narrative: 'Thomas Rook, the gravedigger, approaches nervously. He claims the cemetery has been peaceful for years.',
        backgroundImage: '',
        questions: [
          { question: 'Is the caretaker telling the truth?', cardNames: ['Dog', 'Gentleman', 'Clouds'], cardMeanings: ['loyalty', 'a man', 'confusion'], interpretations: [
            { text: 'He is loyal but confused about what is happening.', quality: 'correct', points: 10 },
            { text: 'He secretly caused the disturbances.', quality: 'wrong', points: 0 },
            { text: 'He hides small details.', quality: 'partial', points: 5 },
          ]},
          { question: 'Does he know who opened the graves?', cardNames: ['Birds', 'Gentleman', 'Clouds'], cardMeanings: ['rumors', 'a man', 'confusion'], interpretations: [
            { text: 'He heard rumors but has no clear answer.', quality: 'correct', points: 10 },
            { text: 'He witnessed the crime.', quality: 'wrong', points: 0 },
            { text: 'He suspects someone.', quality: 'partial', points: 5 },
          ]},
          { question: 'Is he afraid of something?', cardNames: ['Cross', 'Gentleman', 'Moon'], cardMeanings: ['burden', 'a man', 'emotions'], interpretations: [
            { text: 'He fears a curse and believes something terrible is happening.', quality: 'correct', points: 10 },
            { text: 'He is not afraid at all.', quality: 'wrong', points: 0 },
            { text: 'He worries about losing his job.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Cemetery Chapel',
        narrative: 'Inside the chapel you meet Father Gabriel, the priest. He insists dark forces are awakening.',
        backgroundImage: '',
        questions: [
          { question: 'Is Father Gabriel correct about the curse?', cardNames: ['Cross', 'Spirit', 'Clouds'], cardMeanings: ['faith', 'supernatural', 'confusion'], interpretations: [
            { text: 'People believe in a curse, but confusion surrounds the truth.', quality: 'correct', points: 10 },
            { text: 'The priest has summoned spirits.', quality: 'wrong', points: 0 },
            { text: 'Spiritual fear influences the town.', quality: 'partial', points: 5 },
          ]},
          { question: 'Does the chapel hide secrets?', cardNames: ['Tower', 'Book', 'Key'], cardMeanings: ['building', 'knowledge', 'discovery'], interpretations: [
            { text: 'Important historical records inside the chapel may reveal clues.', quality: 'correct', points: 10 },
            { text: 'The chapel contains the treasure.', quality: 'wrong', points: 0 },
            { text: 'The chapel hides forgotten documents.', quality: 'partial', points: 5 },
          ]},
          { question: 'Who benefits from the fear?', cardNames: ['Fox', 'Garden', 'Mice'], cardMeanings: ['deception', 'public', 'theft'], interpretations: [
            { text: 'Someone spreads fear publicly to hide their actions.', quality: 'correct', points: 10 },
            { text: 'The town created the curse together.', quality: 'wrong', points: 0 },
            { text: 'Rumors are spreading.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Historian',
        narrative: 'A scholar named Lydia Harrow has been studying the cemetery. She claims the place holds ancient history.',
        backgroundImage: '',
        questions: [
          { question: 'Is Lydia searching for something?', cardNames: ['Book', 'Key', 'Coffin'], cardMeanings: ['knowledge', 'discovery', 'grave'], interpretations: [
            { text: 'She believes a secret lies buried within the cemetery.', quality: 'correct', points: 10 },
            { text: 'She studies ghosts.', quality: 'wrong', points: 0 },
            { text: 'She studies old graves.', quality: 'partial', points: 5 },
          ]},
          { question: 'Is she connected to the grave openings?', cardNames: ['Fox', 'Lady', 'Book'], cardMeanings: ['deception', 'a woman', 'secret'], interpretations: [
            { text: 'She is secretly involved in the disturbances.', quality: 'correct', points: 10 },
            { text: 'She is completely innocent.', quality: 'wrong', points: 0 },
            { text: 'She has been observing the events closely.', quality: 'partial', points: 5 },
          ]},
          { question: 'Does she believe in the curse?', cardNames: ['Lady', 'Clouds', 'Spirit'], cardMeanings: ['a woman', 'confusion', 'supernatural'], interpretations: [
            { text: 'She encourages the supernatural rumors.', quality: 'correct', points: 10 },
            { text: 'She fears the spirits.', quality: 'wrong', points: 0 },
            { text: 'She is unsure about the truth.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'Strange Lanterns',
        narrative: 'Near the trees you discover hidden lantern devices.',
        backgroundImage: '',
        questions: [
          { question: 'Were these used to create ghost lights?', cardNames: ['Stars', 'Fox', 'Garden'], cardMeanings: ['lights', 'trickery', 'public'], interpretations: [
            { text: 'Artificial lights were used to create ghost sightings.', quality: 'correct', points: 10 },
            { text: 'The lights appear naturally.', quality: 'wrong', points: 0 },
            { text: 'Lights were placed intentionally.', quality: 'partial', points: 5 },
          ]},
          { question: 'Who placed them here?', cardNames: ['Fox', 'Lady', 'Book'], cardMeanings: ['deception', 'a woman', 'knowledge'], interpretations: [
            { text: 'Lydia secretly placed the lights.', quality: 'correct', points: 10 },
            { text: 'The caretaker did it.', quality: 'wrong', points: 0 },
            { text: 'Someone intelligent planned this.', quality: 'partial', points: 5 },
          ]},
          { question: 'Why were they used?', cardNames: ['Mountain', 'Fox', 'Coffin'], cardMeanings: ['obstacle', 'cunning', 'grave'], interpretations: [
            { text: 'The lights kept people away from certain graves.', quality: 'correct', points: 10 },
            { text: 'They were used for ceremonies.', quality: 'wrong', points: 0 },
            { text: 'They were meant to scare visitors.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Hidden Map',
        narrative: 'In the chapel archives you find a century-old map of the cemetery.',
        backgroundImage: '',
        questions: [
          { question: 'Does the map reveal a hidden place?', cardNames: ['Key', 'Book', 'Coffin'], cardMeanings: ['discovery', 'knowledge', 'grave'], interpretations: [
            { text: 'The map reveals a hidden burial chamber.', quality: 'correct', points: 10 },
            { text: 'The map marks cursed areas.', quality: 'wrong', points: 0 },
            { text: 'The map marks special graves.', quality: 'partial', points: 5 },
          ]},
          { question: 'Was treasure buried here?', cardNames: ['Fish', 'Key', 'Coffin'], cardMeanings: ['wealth', 'discovery', 'burial'], interpretations: [
            { text: 'Something valuable may be buried beneath a grave.', quality: 'correct', points: 10 },
            { text: 'The coffin itself is gold.', quality: 'wrong', points: 0 },
            { text: 'The grave contains rare artifacts.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did Lydia discover this map?', cardNames: ['Lady', 'Book', 'Fox'], cardMeanings: ['a woman', 'knowledge', 'cunning'], interpretations: [
            { text: 'Lydia secretly studied this map.', quality: 'correct', points: 10 },
            { text: 'She has never seen the map.', quality: 'wrong', points: 0 },
            { text: 'She knew about the cemetery history.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'The Old Crypt',
        narrative: 'You discover an ancient crypt partially opened.',
        backgroundImage: '',
        questions: [
          { question: 'Is this where Lydia searched?', cardNames: ['Fox', 'Lady', 'Coffin'], cardMeanings: ['deception', 'a woman', 'burial'], interpretations: [
            { text: 'Lydia opened this crypt secretly.', quality: 'correct', points: 10 },
            { text: 'The caretaker opened it.', quality: 'wrong', points: 0 },
            { text: 'Someone recently opened it.', quality: 'partial', points: 5 },
          ]},
          { question: 'What lies beneath the crypt?', cardNames: ['Fish', 'Book', 'Coffin'], cardMeanings: ['treasure', 'secret', 'burial'], interpretations: [
            { text: 'A hidden treasure lies beneath the crypt.', quality: 'correct', points: 10 },
            { text: 'The crypt contains cursed bones.', quality: 'wrong', points: 0 },
            { text: 'Historical artifacts lie buried.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did Lydia act alone?', cardNames: ['Fox', 'Lady', 'Mountain'], cardMeanings: ['cunning', 'a woman', 'difficulty'], interpretations: [
            { text: 'Lydia acted alone but faced difficulty digging.', quality: 'correct', points: 10 },
            { text: 'A group opened the crypt.', quality: 'wrong', points: 0 },
            { text: 'Someone helped her briefly.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'Confronting Lydia',
        narrative: 'You confront Lydia with the evidence.',
        backgroundImage: '',
        questions: [
          { question: 'Did Lydia create the ghost sightings?', cardNames: ['Fox', 'Stars', 'Garden'], cardMeanings: ['deception', 'lights', 'public'], interpretations: [
            { text: 'She created ghost lights to scare people away.', quality: 'correct', points: 10 },
            { text: 'The ghosts appeared naturally.', quality: 'wrong', points: 0 },
            { text: 'She spread rumors of ghosts.', quality: 'partial', points: 5 },
          ]},
          { question: 'What was her true goal?', cardNames: ['Fish', 'Book', 'Key'], cardMeanings: ['treasure', 'knowledge', 'discovery'], interpretations: [
            { text: 'She searched for a legendary buried treasure.', quality: 'correct', points: 10 },
            { text: 'She wanted to prove ghosts exist.', quality: 'wrong', points: 0 },
            { text: 'She wanted historical artifacts.', quality: 'partial', points: 5 },
          ]},
          { question: 'Did she intend to steal treasure?', cardNames: ['Fox', 'Lady', 'Fish'], cardMeanings: ['deception', 'a woman', 'wealth'], interpretations: [
            { text: 'She intended to secretly claim the treasure.', quality: 'correct', points: 10 },
            { text: 'She planned to donate it.', quality: 'wrong', points: 0 },
            { text: 'She hoped to discover something valuable.', quality: 'partial', points: 5 },
          ]}
        ]
      },
      {
        title: 'Final Deduction',
        narrative: 'The truth behind the curse of Blackthorn Cemetery must be revealed.',
        backgroundImage: '',
        isFinal: true,
        questions: [
          {
            question: 'What truly caused the curse of Blackthorn Cemetery?',
            cardNames: ['Fox', 'Lady', 'Stars', 'Coffin', 'Fish'],
            cardMeanings: ['deception', 'Lydia', 'ghost lights', 'graves', 'treasure'],
            interpretations: [
              { text: 'Lydia staged ghost lights and opened graves while searching for hidden treasure beneath the cemetery.', quality: 'correct', points: 20 },
              { text: 'Lydia disturbed the graves accidentally while studying history.', quality: 'partial', points: 10 },
              { text: 'Spirits awakened and Lydia attempted to stop them.', quality: 'wrong', points: 0 },
            ]
          }
        ],
        finalOptions: [
          { text: 'Lydia staged ghost lights and opened graves to search for hidden treasure.', isCorrect: true, ending: 'Lydia confesses and the treasure is recovered legally.' },
          { text: 'Lydia disturbed graves accidentally while studying history.', isCorrect: false, ending: 'Lydia escapes but the haunting stops.' },
          { text: 'Spirits awakened and Lydia attempted to stop them.', isCorrect: false, ending: 'The town continues believing the cemetery is cursed.' },
        ]
      }
    ]
  },

  // ===== CHAPTER 4: The Alchemist's Silent Laboratory =====
  {
    id: 4,
    title: "The Alchemist's Silent Laboratory",
    subtitle: 'A brilliant alchemist found dead in his sealed lab.',
    premise: 'Inside the Royal University Tower, Dr. Elias Verner has been found dead in his sealed laboratory. The door was locked from the inside. No weapon. No clear cause of death. The truth: He staged his death to escape with research, while an assistant opportunistically stole formulas.',
    badge: 'Alchemist Sage',
    badgeEmoji: '⚗️',
    scenes: [
      { title: 'The Sealed Laboratory', narrative: 'The laboratory door was bolted from inside. Chemical apparatus fills the room. Dr. Verner lies on the floor. No wounds, no struggle. A faint chemical smell lingers.', backgroundImage: '', questions: [
        { question: 'What killed Dr. Verner?', cardNames: ['Coffin', 'Book', 'Clouds'], cardMeanings: ['death', 'secret', 'confusion'], interpretations: [
          { text: 'The cause of death is deliberately obscured — this may not be what it seems.', quality: 'correct', points: 10 },
          { text: 'He was poisoned by chemical fumes.', quality: 'wrong', points: 0 },
          { text: 'A hidden substance caused his death.', quality: 'partial', points: 5 },
        ]},
        { question: 'Was the room truly sealed?', cardNames: ['Fox', 'Key', 'Tower'], cardMeanings: ['deception', 'solution', 'institution'], interpretations: [
          { text: 'The sealed room was staged — someone planned this carefully.', quality: 'correct', points: 10 },
          { text: 'The lock malfunctioned.', quality: 'wrong', points: 0 },
          { text: 'There may be another way in or out.', quality: 'partial', points: 5 },
        ]},
        { question: 'Who discovered the body?', cardNames: ['Gentleman', 'Birds', 'Book'], cardMeanings: ['a man', 'communication', 'secret'], interpretations: [
          { text: 'His assistant found him and may know more than he reveals.', quality: 'correct', points: 10 },
          { text: 'A student wandered in randomly.', quality: 'wrong', points: 0 },
          { text: 'University staff discovered him during rounds.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Assistant', narrative: 'Marcus Thorne, Dr. Verner\'s assistant, seems shaken but composed. He claims he last saw the doctor alive yesterday evening.', backgroundImage: '', questions: [
        { question: 'Is Marcus telling the truth?', cardNames: ['Fox', 'Gentleman', 'Moon'], cardMeanings: ['deception', 'a man', 'emotions'], interpretations: [
          { text: 'Marcus hides something but is genuinely affected.', quality: 'correct', points: 10 },
          { text: 'Marcus is completely honest.', quality: 'wrong', points: 0 },
          { text: 'Marcus is nervous about something.', quality: 'partial', points: 5 },
        ]},
        { question: 'Did Marcus have motive?', cardNames: ['Fish', 'Book', 'Snake'], cardMeanings: ['money', 'knowledge', 'betrayal'], interpretations: [
          { text: 'Marcus wanted to steal and sell the doctor\'s research.', quality: 'correct', points: 10 },
          { text: 'Marcus had no interest in the research.', quality: 'wrong', points: 0 },
          { text: 'Marcus felt undervalued and overlooked.', quality: 'partial', points: 5 },
        ]},
        { question: 'What did Marcus do after the discovery?', cardNames: ['Fox', 'Book', 'Mice'], cardMeanings: ['cunning', 'documents', 'theft'], interpretations: [
          { text: 'Marcus secretly removed documents from the laboratory.', quality: 'correct', points: 10 },
          { text: 'Marcus called for help immediately.', quality: 'wrong', points: 0 },
          { text: 'Marcus lingered in the lab suspiciously.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The University Dean', narrative: 'Dean Hargrove is concerned about the university\'s reputation. He wants this resolved quietly.', backgroundImage: '', questions: [
        { question: 'Is the Dean hiding something?', cardNames: ['Tower', 'Fox', 'Ring'], cardMeanings: ['authority', 'deception', 'contract'], interpretations: [
          { text: 'The Dean knows about controversial research being conducted.', quality: 'correct', points: 10 },
          { text: 'The Dean is completely transparent.', quality: 'wrong', points: 0 },
          { text: 'The Dean worries about scandal.', quality: 'partial', points: 5 },
        ]},
        { question: 'Was there pressure on Dr. Verner?', cardNames: ['Whip', 'Ring', 'Tower'], cardMeanings: ['conflict', 'contract', 'institution'], interpretations: [
          { text: 'The university demanded exclusive rights to his discoveries.', quality: 'correct', points: 10 },
          { text: 'The university fully supported his freedom.', quality: 'wrong', points: 0 },
          { text: 'There were disagreements about funding.', quality: 'partial', points: 5 },
        ]},
        { question: 'Did the Dean benefit from the death?', cardNames: ['Fish', 'Tower', 'Coffin'], cardMeanings: ['money', 'institution', 'ending'], interpretations: [
          { text: 'The university gains control of all research if he is declared dead.', quality: 'correct', points: 10 },
          { text: 'The Dean loses nothing.', quality: 'wrong', points: 0 },
          { text: 'The research program may be shut down.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Secret Formula', narrative: 'Among the apparatus, you find notes about a groundbreaking alchemical formula — but key pages are missing.', backgroundImage: '', questions: [
        { question: 'Who took the missing pages?', cardNames: ['Mice', 'Book', 'Fox'], cardMeanings: ['theft', 'documents', 'cunning'], interpretations: [
          { text: 'Someone stole the formula pages after the death.', quality: 'correct', points: 10 },
          { text: 'Dr. Verner destroyed them.', quality: 'wrong', points: 0 },
          { text: 'The pages were misplaced.', quality: 'partial', points: 5 },
        ]},
        { question: 'How valuable was this formula?', cardNames: ['Fish', 'Sun', 'Key'], cardMeanings: ['wealth', 'success', 'achievement'], interpretations: [
          { text: 'The formula would be worth a fortune to the right buyer.', quality: 'correct', points: 10 },
          { text: 'The formula was merely theoretical.', quality: 'wrong', points: 0 },
          { text: 'It had academic importance.', quality: 'partial', points: 5 },
        ]},
        { question: 'Did Dr. Verner intend to share it?', cardNames: ['Book', 'Crossroads', 'Ship'], cardMeanings: ['secret', 'choice', 'departure'], interpretations: [
          { text: 'He planned to take the formula and leave the university.', quality: 'correct', points: 10 },
          { text: 'He planned to publish openly.', quality: 'wrong', points: 0 },
          { text: 'He was undecided.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'Chemical Analysis', narrative: 'You analyze the substances found in the laboratory. Some don\'t match any known experiment.', backgroundImage: '', questions: [
        { question: 'Was a death-simulating substance used?', cardNames: ['Coffin', 'Fox', 'Tree'], cardMeanings: ['death', 'deception', 'health'], interpretations: [
          { text: 'A chemical was used to simulate death convincingly.', quality: 'correct', points: 10 },
          { text: 'All substances are normal lab chemicals.', quality: 'wrong', points: 0 },
          { text: 'Some unusual compounds were present.', quality: 'partial', points: 5 },
        ]},
        { question: 'Did someone tamper with the experiments?', cardNames: ['Snake', 'Book', 'Scythe'], cardMeanings: ['betrayal', 'knowledge', 'danger'], interpretations: [
          { text: 'Marcus secretly altered some experiments.', quality: 'correct', points: 10 },
          { text: 'Everything was left untouched.', quality: 'wrong', points: 0 },
          { text: 'Some equipment was moved.', quality: 'partial', points: 5 },
        ]},
        { question: 'Is Dr. Verner actually dead?', cardNames: ['Coffin', 'Fox', 'Ship'], cardMeanings: ['death', 'deception', 'departure'], interpretations: [
          { text: 'The evidence suggests the death may be staged.', quality: 'correct', points: 10 },
          { text: 'He is definitely dead.', quality: 'wrong', points: 0 },
          { text: 'Something about the death seems unusual.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'Secret Correspondence', narrative: 'Hidden in the lab wall, you find letters written by Dr. Verner to an unknown recipient.', backgroundImage: '', questions: [
        { question: 'Who was he writing to?', cardNames: ['Letter', 'Ship', 'Fox'], cardMeanings: ['message', 'journey', 'cunning'], interpretations: [
          { text: 'He corresponded with a foreign buyer for his research.', quality: 'correct', points: 10 },
          { text: 'He wrote to a family member.', quality: 'wrong', points: 0 },
          { text: 'He wrote to a colleague abroad.', quality: 'partial', points: 5 },
        ]},
        { question: 'Was he planning to escape?', cardNames: ['Ship', 'Fox', 'Key'], cardMeanings: ['departure', 'deception', 'solution'], interpretations: [
          { text: 'He meticulously planned his disappearance.', quality: 'correct', points: 10 },
          { text: 'He had no plans to leave.', quality: 'wrong', points: 0 },
          { text: 'He considered leaving.', quality: 'partial', points: 5 },
        ]},
        { question: 'Did Marcus know about these letters?', cardNames: ['Mice', 'Book', 'Gentleman'], cardMeanings: ['theft', 'secrets', 'a man'], interpretations: [
          { text: 'Marcus discovered the letters and used them for his own scheme.', quality: 'correct', points: 10 },
          { text: 'Marcus had no knowledge of the letters.', quality: 'wrong', points: 0 },
          { text: 'Marcus suspected something secret.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Hidden Passage', narrative: 'Behind a bookshelf in the laboratory, you discover a concealed passage leading outside the university.', backgroundImage: '', questions: [
        { question: 'Did Dr. Verner use this passage?', cardNames: ['Fox', 'Key', 'Ship'], cardMeanings: ['deception', 'escape', 'departure'], interpretations: [
          { text: 'He escaped through this passage after staging his death.', quality: 'correct', points: 10 },
          { text: 'He never knew about this passage.', quality: 'wrong', points: 0 },
          { text: 'The passage was used at some point.', quality: 'partial', points: 5 },
        ]},
        { question: 'Was the passage recently used?', cardNames: ['Crossroads', 'Fox', 'Anchor'], cardMeanings: ['path', 'cunning', 'determination'], interpretations: [
          { text: 'Fresh footprints and disturbance prove recent use.', quality: 'correct', points: 10 },
          { text: 'The passage has been sealed for years.', quality: 'wrong', points: 0 },
          { text: 'There are signs of activity.', quality: 'partial', points: 5 },
        ]},
        { question: 'Where does it lead?', cardNames: ['Ship', 'Stars', 'Crossroads'], cardMeanings: ['journey', 'hope', 'choices'], interpretations: [
          { text: 'It leads to the river docks — an escape route from the city.', quality: 'correct', points: 10 },
          { text: 'It leads to another laboratory.', quality: 'wrong', points: 0 },
          { text: 'It exits somewhere outside the university.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'Marcus\'s Betrayal', narrative: 'You find copies of the stolen formula pages in Marcus\'s quarters, along with a buyer\'s offer letter.', backgroundImage: '', questions: [
        { question: 'Did Marcus plan to sell the research?', cardNames: ['Fish', 'Fox', 'Book'], cardMeanings: ['money', 'cunning', 'knowledge'], interpretations: [
          { text: 'Marcus planned to sell the stolen formulas for personal gain.', quality: 'correct', points: 10 },
          { text: 'Marcus was keeping the formulas safe.', quality: 'wrong', points: 0 },
          { text: 'Marcus copied the formulas out of curiosity.', quality: 'partial', points: 5 },
        ]},
        { question: 'Did Marcus know the death was staged?', cardNames: ['Fox', 'Coffin', 'Clouds'], cardMeanings: ['deception', 'death', 'confusion'], interpretations: [
          { text: 'Marcus did not know — he seized the opportunity.', quality: 'correct', points: 10 },
          { text: 'Marcus helped stage the death.', quality: 'wrong', points: 0 },
          { text: 'Marcus suspected something was off.', quality: 'partial', points: 5 },
        ]},
        { question: 'Was there a third party involved?', cardNames: ['Snake', 'Fish', 'Gentleman'], cardMeanings: ['conspiracy', 'money', 'a man'], interpretations: [
          { text: 'A wealthy buyer orchestrated Marcus\'s theft from the outside.', quality: 'correct', points: 10 },
          { text: 'No one else was involved.', quality: 'wrong', points: 0 },
          { text: 'Someone financed Marcus\'s actions.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Double Deception', narrative: 'Two schemes were happening simultaneously: Dr. Verner\'s staged death and Marcus\'s opportunistic theft.', backgroundImage: '', questions: [
        { question: 'Did Dr. Verner and Marcus work together?', cardNames: ['Fox', 'Gentleman', 'Crossroads'], cardMeanings: ['deception', 'men', 'separate paths'], interpretations: [
          { text: 'They acted independently — two separate deceptions.', quality: 'correct', points: 10 },
          { text: 'They were partners in crime.', quality: 'wrong', points: 0 },
          { text: 'Their plans partially overlapped.', quality: 'partial', points: 5 },
        ]},
        { question: 'Is Dr. Verner still alive?', cardNames: ['Sun', 'Ship', 'Fox'], cardMeanings: ['life', 'journey', 'deception'], interpretations: [
          { text: 'He is alive and has fled the city with his real research.', quality: 'correct', points: 10 },
          { text: 'He is truly dead.', quality: 'wrong', points: 0 },
          { text: 'His fate is uncertain.', quality: 'partial', points: 5 },
        ]},
        { question: 'Can both criminals be caught?', cardNames: ['Key', 'Fox', 'Ring'], cardMeanings: ['solution', 'cunning', 'binding'], interpretations: [
          { text: 'With the right evidence, both schemes can be exposed.', quality: 'correct', points: 10 },
          { text: 'It\'s too late to catch either.', quality: 'wrong', points: 0 },
          { text: 'Only Marcus can be caught.', quality: 'partial', points: 5 },
        ]}
      ]},
      {
        title: 'Final Deduction',
        narrative: 'The full truth of the alchemist\'s laboratory must be revealed.',
        backgroundImage: '',
        isFinal: true,
        questions: [
          {
            question: 'What truly happened in the sealed laboratory?',
            cardNames: ['Fox', 'Coffin', 'Ship', 'Mice', 'Book'],
            cardMeanings: ['deception', 'staged death', 'escape', 'theft', 'research'],
            interpretations: [
              { text: 'Dr. Verner staged his death to escape with his research, while Marcus independently stole formula copies to sell.', quality: 'correct', points: 20 },
              { text: 'Marcus poisoned Dr. Verner to steal his research.', quality: 'wrong', points: 0 },
              { text: 'Dr. Verner died accidentally and Marcus stole from the scene.', quality: 'partial', points: 10 },
            ]
          }
        ],
        finalOptions: [
          { text: 'Dr. Verner staged his death; Marcus independently stole formula copies.', isCorrect: true, ending: 'Both schemes are exposed. Marcus is arrested. Dr. Verner is tracked and his research secured.' },
          { text: 'Marcus poisoned Dr. Verner to steal the research.', isCorrect: false, ending: 'Marcus is wrongly charged with murder while the real truth remains hidden.' },
          { text: 'Dr. Verner died accidentally from chemical exposure.', isCorrect: false, ending: 'The case is closed as an accident. Both criminals escape justice.' },
        ]
      }
    ]
  },

  // ===== CHAPTER 5: The Phantom of the Iron Bridge =====
  {
    id: 5,
    title: 'The Phantom of the Iron Bridge',
    subtitle: 'Ghostly sightings and disappearances at the old bridge.',
    premise: 'People crossing the Iron Bridge at midnight report seeing a phantom figure. Three travelers have vanished. The truth: A smuggler uses ghost stories to keep people away from the bridge where contraband is moved through a hidden compartment.',
    badge: 'Bridge Warden',
    badgeEmoji: '🌉',
    scenes: [
      { title: 'The Bridge at Midnight', narrative: 'The Iron Bridge looms in the fog. Local fishermen refuse to cross after dark. You arrive as the town clock strikes midnight.', backgroundImage: '', questions: [
        { question: 'Is the phantom real?', cardNames: ['Spirit', 'Fox', 'Clouds'], cardMeanings: ['supernatural', 'deception', 'confusion'], interpretations: [
          { text: 'The phantom is a deliberate deception, not supernatural.', quality: 'correct', points: 10 },
          { text: 'A real ghost haunts the bridge.', quality: 'wrong', points: 0 },
          { text: 'Something unexplained is happening.', quality: 'partial', points: 5 },
        ]},
        { question: 'Why are people disappearing?', cardNames: ['Mice', 'Gentleman', 'Mountain'], cardMeanings: ['loss', 'a man', 'obstacle'], interpretations: [
          { text: 'Someone is deliberately preventing witnesses.', quality: 'correct', points: 10 },
          { text: 'People fall from the bridge accidentally.', quality: 'wrong', points: 0 },
          { text: 'Fear keeps people from returning.', quality: 'partial', points: 5 },
        ]},
        { question: 'What should I examine first?', cardNames: ['Key', 'Tower', 'Book'], cardMeanings: ['discovery', 'structure', 'hidden knowledge'], interpretations: [
          { text: 'The bridge structure itself hides something important.', quality: 'correct', points: 10 },
          { text: 'The river below holds the answers.', quality: 'wrong', points: 0 },
          { text: 'Local records may help.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Missing Travelers', narrative: 'The families of the missing provide descriptions. All three disappeared on moonless nights.', backgroundImage: '', questions: [
        { question: 'Were the disappearances connected?', cardNames: ['Ring', 'Fox', 'Moon'], cardMeanings: ['pattern', 'cunning', 'night'], interpretations: [
          { text: 'All disappearances follow the same pattern on specific nights.', quality: 'correct', points: 10 },
          { text: 'The disappearances are coincidental.', quality: 'wrong', points: 0 },
          { text: 'Some connection exists.', quality: 'partial', points: 5 },
        ]},
        { question: 'Did the travelers see something they shouldn\'t have?', cardNames: ['Book', 'Fox', 'Scythe'], cardMeanings: ['secret', 'deception', 'danger'], interpretations: [
          { text: 'They witnessed illegal activity and were silenced.', quality: 'correct', points: 10 },
          { text: 'They saw the ghost and fled in terror.', quality: 'wrong', points: 0 },
          { text: 'They stumbled upon something unusual.', quality: 'partial', points: 5 },
        ]},
        { question: 'Are the travelers still alive?', cardNames: ['Anchor', 'Mountain', 'Key'], cardMeanings: ['holding', 'obstacle', 'solution'], interpretations: [
          { text: 'They are being held captive somewhere nearby.', quality: 'correct', points: 10 },
          { text: 'They drowned in the river.', quality: 'wrong', points: 0 },
          { text: 'Their fate is uncertain.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Bridge Keeper', narrative: 'Old Henrik maintains the bridge. He\'s lived nearby for decades and dismisses the ghost stories.', backgroundImage: '', questions: [
        { question: 'Is Henrik honest?', cardNames: ['Dog', 'Gentleman', 'Fox'], cardMeanings: ['loyalty', 'a man', 'cunning'], interpretations: [
          { text: 'Henrik is loyal to someone and covers for their activities.', quality: 'correct', points: 10 },
          { text: 'Henrik is completely innocent.', quality: 'wrong', points: 0 },
          { text: 'Henrik knows more than he admits.', quality: 'partial', points: 5 },
        ]},
        { question: 'Does Henrik know about the phantom?', cardNames: ['Fox', 'Gentleman', 'Clouds'], cardMeanings: ['deception', 'a man', 'confusion'], interpretations: [
          { text: 'Henrik helps create the phantom illusion.', quality: 'correct', points: 10 },
          { text: 'Henrik has never seen anything unusual.', quality: 'wrong', points: 0 },
          { text: 'Henrik has seen strange things but stays quiet.', quality: 'partial', points: 5 },
        ]},
        { question: 'Who does Henrik work for?', cardNames: ['Snake', 'Fish', 'Gentleman'], cardMeanings: ['conspiracy', 'money', 'a man'], interpretations: [
          { text: 'Henrik works for a smuggling operation run by a wealthy figure.', quality: 'correct', points: 10 },
          { text: 'Henrik works alone.', quality: 'wrong', points: 0 },
          { text: 'Henrik is paid by someone for his silence.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'Under the Bridge', narrative: 'Beneath the bridge, you discover fresh marks on the iron beams and a hidden compartment.', backgroundImage: '', questions: [
        { question: 'What is hidden in the compartment?', cardNames: ['Fish', 'Book', 'Key'], cardMeanings: ['goods', 'secret', 'discovery'], interpretations: [
          { text: 'Smuggled contraband is being stored in bridge compartments.', quality: 'correct', points: 10 },
          { text: 'Treasure from a sunken ship.', quality: 'wrong', points: 0 },
          { text: 'Something valuable is hidden here.', quality: 'partial', points: 5 },
        ]},
        { question: 'How often is the compartment used?', cardNames: ['Moon', 'Ring', 'Ship'], cardMeanings: ['night', 'cycle', 'transport'], interpretations: [
          { text: 'Goods are moved regularly on moonless nights.', quality: 'correct', points: 10 },
          { text: 'It was used once and abandoned.', quality: 'wrong', points: 0 },
          { text: 'It is used occasionally.', quality: 'partial', points: 5 },
        ]},
        { question: 'Who built the compartment?', cardNames: ['Gentleman', 'Fox', 'Anchor'], cardMeanings: ['a man', 'cunning', 'work'], interpretations: [
          { text: 'A skilled craftsman built it for the smuggling ring.', quality: 'correct', points: 10 },
          { text: 'It was part of the original bridge design.', quality: 'wrong', points: 0 },
          { text: 'Someone modified the bridge structure.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Smuggler\'s Network', narrative: 'Evidence points to a larger smuggling operation using the bridge as a transfer point.', backgroundImage: '', questions: [
        { question: 'Who leads the smuggling ring?', cardNames: ['Bear', 'Fox', 'Fish'], cardMeanings: ['power', 'cunning', 'money'], interpretations: [
          { text: 'A powerful merchant uses the bridge to move illegal goods.', quality: 'correct', points: 10 },
          { text: 'Henrik runs the operation alone.', quality: 'wrong', points: 0 },
          { text: 'Someone wealthy is involved.', quality: 'partial', points: 5 },
        ]},
        { question: 'How do they create the phantom?', cardNames: ['Fox', 'Stars', 'Clouds'], cardMeanings: ['trickery', 'lights', 'fog'], interpretations: [
          { text: 'Lanterns and costumes create the ghostly effect in fog.', quality: 'correct', points: 10 },
          { text: 'They use actual supernatural rituals.', quality: 'wrong', points: 0 },
          { text: 'Some kind of visual trick is used.', quality: 'partial', points: 5 },
        ]},
        { question: 'Where are the missing travelers held?', cardNames: ['House', 'Mountain', 'Key'], cardMeanings: ['building', 'isolation', 'discovery'], interpretations: [
          { text: 'They are held in a warehouse near the docks.', quality: 'correct', points: 10 },
          { text: 'They were sent abroad on a ship.', quality: 'wrong', points: 0 },
          { text: 'They are somewhere nearby.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Merchant\'s Office', narrative: 'You investigate the offices of Aldric Crane, a prominent merchant with connections to the bridge area.', backgroundImage: '', questions: [
        { question: 'Is Aldric Crane the smuggler?', cardNames: ['Bear', 'Snake', 'Fish'], cardMeanings: ['power', 'betrayal', 'commerce'], interpretations: [
          { text: 'Aldric Crane runs the smuggling operation from his merchant business.', quality: 'correct', points: 10 },
          { text: 'Aldric is a legitimate businessman.', quality: 'wrong', points: 0 },
          { text: 'Aldric has shady business practices.', quality: 'partial', points: 5 },
        ]},
        { question: 'What is being smuggled?', cardNames: ['Fish', 'Book', 'Cross'], cardMeanings: ['goods', 'secrets', 'burden'], interpretations: [
          { text: 'Forbidden alchemical substances and stolen artifacts.', quality: 'correct', points: 10 },
          { text: 'Ordinary trade goods to avoid taxes.', quality: 'wrong', points: 0 },
          { text: 'Valuable contraband.', quality: 'partial', points: 5 },
        ]},
        { question: 'Can you find evidence?', cardNames: ['Book', 'Key', 'Letter'], cardMeanings: ['records', 'proof', 'documents'], interpretations: [
          { text: 'Ledgers in a hidden safe document all smuggling transactions.', quality: 'correct', points: 10 },
          { text: 'All evidence has been destroyed.', quality: 'wrong', points: 0 },
          { text: 'Some records exist somewhere.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'Rescuing the Travelers', narrative: 'Armed with evidence, you locate the warehouse where the missing travelers are held.', backgroundImage: '', questions: [
        { question: 'Are the travelers unharmed?', cardNames: ['Tree', 'Anchor', 'Sun'], cardMeanings: ['health', 'perseverance', 'hope'], interpretations: [
          { text: 'They are alive and relatively unharmed, though frightened.', quality: 'correct', points: 10 },
          { text: 'They have been seriously injured.', quality: 'wrong', points: 0 },
          { text: 'Their condition varies.', quality: 'partial', points: 5 },
        ]},
        { question: 'Can they identify the smugglers?', cardNames: ['Birds', 'Gentleman', 'Fox'], cardMeanings: ['testimony', 'men', 'cunning'], interpretations: [
          { text: 'The travelers can identify Aldric\'s men who captured them.', quality: 'correct', points: 10 },
          { text: 'They saw nothing — they were blindfolded.', quality: 'wrong', points: 0 },
          { text: 'They have partial memories.', quality: 'partial', points: 5 },
        ]},
        { question: 'Will Aldric try to escape?', cardNames: ['Ship', 'Fox', 'Scythe'], cardMeanings: ['flight', 'cunning', 'urgency'], interpretations: [
          { text: 'Aldric will attempt to flee the city by river.', quality: 'correct', points: 10 },
          { text: 'Aldric will surrender peacefully.', quality: 'wrong', points: 0 },
          { text: 'Aldric may try to escape.', quality: 'partial', points: 5 },
        ]}
      ]},
      { title: 'The Confrontation', narrative: 'You present your evidence to the authorities. Now you must make the final accusation.', backgroundImage: '', questions: [
        { question: 'Who is responsible for the phantom?', cardNames: ['Fox', 'Bear', 'Stars'], cardMeanings: ['deception', 'power', 'illusion'], interpretations: [
          { text: 'Aldric Crane created the phantom to protect his smuggling route.', quality: 'correct', points: 10 },
          { text: 'The phantom was created by Henrik alone.', quality: 'wrong', points: 0 },
          { text: 'Multiple people contributed to the deception.', quality: 'partial', points: 5 },
        ]},
        { question: 'What was the full scope of the operation?', cardNames: ['Fish', 'Ring', 'Snake'], cardMeanings: ['commerce', 'network', 'conspiracy'], interpretations: [
          { text: 'A vast smuggling network used the bridge, warehouse, and merchant routes.', quality: 'correct', points: 10 },
          { text: 'It was a small-time operation.', quality: 'wrong', points: 0 },
          { text: 'The operation was significant.', quality: 'partial', points: 5 },
        ]},
        { question: 'Can justice be served?', cardNames: ['Sun', 'Key', 'Cross'], cardMeanings: ['truth', 'solution', 'justice'], interpretations: [
          { text: 'With the evidence and witnesses, complete justice can be achieved.', quality: 'correct', points: 10 },
          { text: 'The criminals will escape.', quality: 'wrong', points: 0 },
          { text: 'Partial justice is possible.', quality: 'partial', points: 5 },
        ]}
      ]},
      {
        title: 'Final Deduction',
        narrative: 'All evidence points to the truth. The phantom of the Iron Bridge was never supernatural.',
        backgroundImage: '',
        isFinal: true,
        questions: [
          {
            question: 'What truly happened at the Iron Bridge?',
            cardNames: ['Fox', 'Bear', 'Fish', 'Stars', 'Key'],
            cardMeanings: ['deception', 'powerful figure', 'smuggling', 'phantom lights', 'truth'],
            interpretations: [
              { text: 'Merchant Aldric Crane created the phantom to scare people away from the bridge where he ran a smuggling operation through hidden compartments.', quality: 'correct', points: 20 },
              { text: 'Henrik the bridge keeper went mad and created the phantom alone.', quality: 'wrong', points: 0 },
              { text: 'A smuggling operation used the bridge but the phantom was unrelated.', quality: 'partial', points: 10 },
            ]
          }
        ],
        finalOptions: [
          { text: 'Aldric Crane created the phantom to protect his smuggling operation through the bridge.', isCorrect: true, ending: 'Aldric Crane is arrested. The travelers are freed. The phantom of the Iron Bridge is no more.' },
          { text: 'Henrik went mad and created the phantom independently.', isCorrect: false, ending: 'Henrik is wrongly blamed. The smuggling continues under a new phantom.' },
          { text: 'The phantom was a real ghost attracted by criminal activity.', isCorrect: false, ending: 'The supernatural explanation satisfies the town, but the criminals escape.' },
        ]
      }
    ]
  }
];
