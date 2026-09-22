;; StackProof
;; Onchain contribution proof registry for Stacks builders

(define-data-var proof-count uint u0)

(define-map proofs
  uint
  {
    contributor: principal,
    title: (string-ascii 100),
    category: (string-ascii 50),
    proof-url: (string-ascii 200)
  }
)

(define-public (submit-proof
    (title (string-ascii 100))
    (category (string-ascii 50))
    (proof-url (string-ascii 200)))
  (let
    (
      (proof-id (+ (var-get proof-count) u1))
      (sender tx-sender)
    )
    (map-set proofs proof-id
      {
        contributor: sender,
        title: title,
        category: category,
        proof-url: proof-url
      }
    )
    (var-set proof-count proof-id)
    (ok proof-id)
  )
)

(define-read-only (get-proof (proof-id uint))
  (map-get? proofs proof-id)
)

(define-read-only (get-proof-count)
  (var-get proof-count)
)
